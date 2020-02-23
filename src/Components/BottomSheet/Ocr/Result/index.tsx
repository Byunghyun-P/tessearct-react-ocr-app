import React from "react";

import { OriginalImage } from "./styled";
import { Collapse, Descriptions } from "antd";

import OCRImage from "./OCRImage";

const customPanelStyle: React.CSSProperties = {
  borderRadius: 4,
  border: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};

const { Panel } = Collapse;

function Block({ blocks }: { blocks: Tesseract.Block[] }) {
  return (
    <Collapse bordered={false} accordion>
      {blocks.map((block: Tesseract.Block, idx: number) => (
        <Panel
          header={`(${idx + 1}번째 Block) ${block.text}`}
          key={`${idx}`}
          style={customPanelStyle}
        >
          <Descriptions bordered layout="vertical" column={1} size="small">
            <Descriptions.Item label="텍스트">{block.text}</Descriptions.Item>
            <Descriptions.Item label="Confidence">
              {block.confidence}
            </Descriptions.Item>
            <Descriptions.Item label="paragraphs">
              <Paragraphs
                paragraphs={
                  (block.paragraphs as unknown) as Tesseract.Paragraph[]
                }
              />
            </Descriptions.Item>
          </Descriptions>
        </Panel>
      ))}
    </Collapse>
  );
}

function Paragraphs({ paragraphs }: { paragraphs: Tesseract.Paragraph[] }) {
  return (
    <Collapse bordered={false} accordion>
      {paragraphs.map((paragraph, idx: number) => (
        <Panel
          header={`(${idx + 1}번째 Paragraph) ${paragraph.text}`}
          key={`${idx}`}
          style={customPanelStyle}
        >
          <Descriptions bordered layout="vertical" column={1} size="small">
            <Descriptions.Item label="Text">{paragraph.text}</Descriptions.Item>
            <Descriptions.Item label="Confidence">
              {paragraph.confidence}
            </Descriptions.Item>
            <Descriptions.Item label="Lines">
              <Lines lines={paragraph.lines} />
            </Descriptions.Item>
          </Descriptions>
        </Panel>
      ))}
    </Collapse>
  );
}

function Lines({ lines }: { lines: Tesseract.Line[] }) {
  return (
    <Collapse bordered={false} accordion>
      {lines.map((line, idx: number) => (
        <Panel
          header={`(${idx + 1}번째 Line) ${line.text}`}
          key={`line_${idx}`}
          style={customPanelStyle}
        >
          <Descriptions bordered layout="vertical" column={1} size="small">
            <Descriptions.Item label="Text">{line.text}</Descriptions.Item>
            <Descriptions.Item label="Confidence">
              {line.confidence}
            </Descriptions.Item>
            <Descriptions.Item label="Words">
              <Words words={line.words} />
            </Descriptions.Item>
          </Descriptions>
        </Panel>
      ))}
    </Collapse>
  );
}

function Words({ words }: { words: Tesseract.Word[] }) {
  return (
    <Collapse bordered={false}>
      {words.map((word, idx: number) => (
        <Panel
          header={`(${idx + 1}번째 Word) ${word.text}`}
          key={`word_${idx}`}
          style={customPanelStyle}
        >
          <Descriptions bordered layout="vertical" column={1} size="small">
            <Descriptions.Item label="Text">{word.text}</Descriptions.Item>
            <Descriptions.Item label="Confidence">
              {word.confidence}
            </Descriptions.Item>
            <Descriptions.Item label="정보">
              <Descriptions bordered layout="vertical" column={1}>
                <Descriptions.Item label="language">
                  {word.language}
                </Descriptions.Item>
                <Descriptions.Item label="in_dictionary">
                  {`${word.in_dictionary}`}
                </Descriptions.Item>
                <Descriptions.Item label="is_numeric">
                  {`${word.is_numeric}`}
                </Descriptions.Item>
                <Descriptions.Item label="is_bold">
                  {`${word.is_bold}`}
                </Descriptions.Item>
                <Descriptions.Item label="is_italic">
                  {`${word.is_italic}`}
                </Descriptions.Item>
                <Descriptions.Item label="is_underlined">
                  {`${word.is_underlined}`}
                </Descriptions.Item>
                <Descriptions.Item label="is_monospace">
                  {`${word.is_monospace}`}
                </Descriptions.Item>
                <Descriptions.Item label="is_serif">
                  {`${word.is_serif}`}
                </Descriptions.Item>
                <Descriptions.Item label="is_smallcaps">
                  {`${word.is_smallcaps}`}
                </Descriptions.Item>
                <Descriptions.Item label="font_size">
                  {`${word.font_size}`}
                </Descriptions.Item>
                <Descriptions.Item label="font_id">
                  {`${word.font_id}`}
                </Descriptions.Item>
                <Descriptions.Item label="font_name">
                  {`${word.font_name}`}
                </Descriptions.Item>
              </Descriptions>
            </Descriptions.Item>
            <Descriptions.Item label="Choices">
              {word.choices.map(choice => (
                <Descriptions key={choice.text} layout="vertical" column={1}>
                  <Descriptions.Item label={choice.text}>
                    {choice.confidence}
                  </Descriptions.Item>
                </Descriptions>
              ))}
            </Descriptions.Item>
          </Descriptions>
        </Panel>
      ))}
    </Collapse>
  );
}

enum PANEL_IDS {
  ORIGINAL_IMAGE = "original_image",
  OCR_IMAGE = "ocr_image",
  OCR_RESULT = "ocr_result",
  OCR_INFORMATION = "ocr_information",
  OCR_DETAIL_RESULT = "ocr_detaul_result"
}

interface IProps {
  page?: Tesseract.Page;
  image: string;
}

function Result({ page, image }: IProps) {
  if (page == null) {
    return null;
  }
  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={[PANEL_IDS.OCR_RESULT]}>
        <Panel header="인식 결과" key={PANEL_IDS.OCR_RESULT}>
          {page.text}
        </Panel>
        <Panel header="원본 이미지" key={PANEL_IDS.ORIGINAL_IMAGE}>
          <OriginalImage src={image} />
        </Panel>
        <Panel header="OCR 이미지" key={PANEL_IDS.OCR_IMAGE}>
          <OCRImage image={image} words={page.words} />
        </Panel>
        <Panel header="인식 정보" key={PANEL_IDS.OCR_INFORMATION}>
          <Descriptions bordered>
            <Descriptions.Item label="Tesseract 버전">
              {page.version}
            </Descriptions.Item>
            <Descriptions.Item label="PSM">{page.psm}</Descriptions.Item>
            <Descriptions.Item label="OEM">{page.oem}</Descriptions.Item>
            <Descriptions.Item label="Block 갯수">
              {page.blocks.length}
            </Descriptions.Item>
            <Descriptions.Item label="Paragraph 갯수">
              {page.paragraphs.length}
            </Descriptions.Item>
            <Descriptions.Item label="Line 갯수">
              {page.lines.length}
            </Descriptions.Item>
            <Descriptions.Item label="Word 갯수">
              {page.words.length}
            </Descriptions.Item>
            <Descriptions.Item label="Symbol 갯수">
              {page.symbols.length}
            </Descriptions.Item>
          </Descriptions>
        </Panel>
        <Panel header="결과 분석" key={PANEL_IDS.OCR_DETAIL_RESULT}>
          <Block blocks={page.blocks} />
        </Panel>
      </Collapse>
    </div>
  );
}

export default Result;
