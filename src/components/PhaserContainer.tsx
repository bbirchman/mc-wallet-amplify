import React, { useEffect, useRef, useState } from 'react';
import './PhaserContainer.css';
import { IonButton } from '@ionic/react';
import Phaser from 'phaser';

interface ContainerProps {}

const PhaserContainer: React.FC<ContainerProps> = () => {
  const [showButton, setShowButton] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [game, setGame] = useState<Phaser.Game | null>(null);

  // Function to create a new Phaser Game instance
  const launch = (width: number, height: number) => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: width,
      height: height,
      backgroundColor: '#000000',
      parent: 'phaser-container',
      scene: {
        preload: function () {
          // Preload the PNG image
          this.load.image('hymn', 'src/assets/cards/rare/card-called-hymn.png');
        },
        create: function () {
          // Binding `this` to the current scene
          const scene = this as Phaser.Scene;

          // Create an image
          const image = scene.add.image(scene.cameras.main.centerX, scene.cameras.main.centerY, 'hymn');
          image.setOrigin(0.5, 0.5);

          // Set the scale of the image
          image.setScale(0.5); // Change the scale factor as needed

          // Enable input and drag for the image
          image.setInteractive();
          scene.input.setDraggable(image);

          // Add drag events using arrow functions
          scene.input.on('dragstart', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) => {
            //gameObject.setTint(0xff0000); //RED
            gameObject.setTint(0xd3d3d3); //LIGHT GREY
          });

          scene.input.on('drag', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, dragX: number, dragY: number) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
          });

          scene.input.on('dragend', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) => {
            gameObject.clearTint();
          });
        },
      },
    };

    const newGame = new Phaser.Game(config);
    setGame(newGame);
  };

  const handleResize = () => {
    if (containerRef.current && game) {
      const { clientWidth, clientHeight } = containerRef.current;
      game.scale.resize(clientWidth, clientHeight);
      game.scene.scenes.forEach((scene) => {
        scene.cameras.main.setViewport(0, 0, clientWidth, clientHeight);
      });
    }
  };

  const handleClickStart = () => {
    console.log('Button clicked!');
    setShowButton(false);
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      launch(clientWidth, clientHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [game]);

  // style={{ width: '100%', height: '100vh', position: 'relative' }}
  return (
    <div id="container" ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }} >
      {showButton && (
        <IonButton onClick={handleClickStart}>Open Wallet</IonButton>
      )}
      <div id="phaser-container" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default PhaserContainer;
