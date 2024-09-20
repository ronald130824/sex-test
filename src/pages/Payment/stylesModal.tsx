import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  color: #666;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const QRCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;

  img {
    width: 200px;
    height: 200px;
  }
`;

export const Section = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  color: #666;
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
`;

export const ExpirationText = styled.div`
  color: #666;
  margin-bottom: 1.5rem;
`;

export const ExpiredText = styled.p`
  color: red;
  font-weight: bold;
`;

export const CloseButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
