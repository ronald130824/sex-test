import React, { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import { CloseButton, ExpirationText, ExpiredText, Label, ModalContent, ModalOverlay, QRCodeContainer, Section, TextArea, Title } from './stylesModal';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeBase64: string; // QR Code em base64
  qrCodePayload: string; // Payload do Pix (copia e cola)
  expiration: string;    // Data de expiração
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, qrCodeBase64, qrCodePayload, expiration }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Calcula o tempo restante até a expiração
  useEffect(() => {
    const calculateTimeLeft = () => {
      const expirationDate = new Date(expiration);
      const now = new Date();
      const secondsLeft = differenceInSeconds(expirationDate, now);
      setTimeLeft(secondsLeft);
    };

    if (isOpen) {
      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(timer); // Limpa o intervalo ao fechar o modal
    }
  }, [isOpen, expiration]);

  const formatTimeLeft = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours} horas, ${minutes} minutos e ${remainingSeconds} segundos`;
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Pagamento por Pix</Title>

        {/* Exibe o QR Code vindo em base64 */}
        <QRCodeContainer>
          <img src={`data:image/png;base64,${qrCodeBase64}`} alt="QR Code do Pix" />
        </QRCodeContainer>

        {/* Código Pix (copia e cola) */}
        <Section>
          <Label>Pix copia e cola:</Label>
          <TextArea readOnly value={qrCodePayload} />
        </Section>

        {/* Tempo de expiração */}
        <ExpirationText>
          {timeLeft > 0 ? (
            <p>Expira em: <strong>{formatTimeLeft(timeLeft)}</strong></p>
          ) : (
            <ExpiredText>Expirado</ExpiredText>
          )}
        </ExpirationText>

        <Label>Quando terminar o pagamento pode fecha a caixa</Label>
        <Label>E pode voltar para pagina inicial</Label>

        <CloseButton onClick={onClose}>Fechar</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PaymentModal;
