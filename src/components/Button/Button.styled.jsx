import styled from 'styled-components';

export const BtnLoadMore = styled.button`
  width: 150px;
  text-align: center;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
  border: none;
  background-color: ${p => p.theme.colors.accentLight};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  :hover,
  :focus {
    background-color: ${p => p.theme.colors.accentDark};
    color: #fff;
    box-shadow: -2px -2px 5px #fff,
      2px 2px 5px ${p => p.theme.colors.accentDark};
  }
`;
