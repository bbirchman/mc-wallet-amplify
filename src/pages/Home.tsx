import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import PhaserContainer from '../components/PhaserContainer';

const Home: React.FC = () => {
  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Mancard Wallet</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <PhaserContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
