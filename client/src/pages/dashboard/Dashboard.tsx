import { useNavigate } from 'react-router-dom'
import { Overlay, Container, Title, Button, Text } from '@mantine/core';
import { useStyles } from './dashboard_styles';
import { ItemsCollection } from '../../components/itemsCollection/ItemsCollection';


export function Dashboard() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login')
  }
  return (
    <>
      <div className={classes.header}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(247,227,203,0.25) 0%, rgba(148,199,192,0.5) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container}>
          <Title className={classes.title}>STICKERS</Title>
          <Text className={classes.description} size="xl" mt="xl">
            Funny drawings characterised by ...
          </Text>

          <Button onClick={navigateToLogin} size="xl" radius="xl" className={classes.control}>
            Login
          </Button>
        </Container>
      </div>

      <div>
        <ItemsCollection />
      </div>
    </>
  );
}
