import styled from "styled-components";
import { Progress as OrigProgress } from "antd";

export const Container = styled.div`
  padding: 1rem 0;
`;

export const StatusText = styled.div`
  text-align: center;
`;

export const Progress = styled(OrigProgress)`
  padding: 0 2rem;
`;
