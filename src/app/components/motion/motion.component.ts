import { Component, OnInit, OnDestroy } from '@angular/core';
import { MotionService } from './Services/motion.service';
import { MotionData } from './Model/MotionData.model';

@Component({
  selector: 'app-motion',
  templateUrl: './motion.component.html',
  styleUrls: ['./motion.component.scss']
})
export class MotionComponent implements OnInit, OnDestroy {
  
  constructor(private motionS: MotionService) {}
  motionData: MotionData = {};

  // Posición inicial centrada verticalmente (arriba)
  bubblePosition = { x: 50, y: 15 };

  ngOnInit(): void {
    this.motionS.startMotionDetection((data: MotionData) => {
      this.motionData = data;
      this.updateBubblePosition();
      console.log('Motion Data:', this.motionData);
    });
  }

  ngOnDestroy(): void {
    this.motionS.stopMotionDetection();
  }

  private updateBubblePosition(): void {
    if (this.motionData.rotation?.beta === undefined || this.motionData.rotation?.gamma === undefined) {
      return;
    }

    const beta = this.motionData.rotation.beta;  // Inclinación frontal (-180 a 180)
    const gamma = this.motionData.rotation.gamma; // Inclinación lateral (-90 a 90)

    // Mapeo para posición horizontal (izquierda/derecha)
    this.bubblePosition.x = 50 + (gamma * 0.8); // Factor de reducción para menos sensibilidad

    // Mapeo para posición vertical (arriba/abajo)
    // Dispositivo vertical (beta=0): burbuja arriba (15%)
    // Dispositivo horizontal (beta=90): burbuja abajo (85%)
    this.bubblePosition.y = 15 + (Math.abs(beta) * 0.7); // Factor de reducción

    // Limitar los valores entre 5% y 95% para que no toque los bordes
    this.bubblePosition.x = Math.min(Math.max(this.bubblePosition.x, 5), 95);
    this.bubblePosition.y = Math.min(Math.max(this.bubblePosition.y, 5), 95);
  }
}