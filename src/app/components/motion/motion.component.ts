import { Component, OnInit, OnDestroy } from '@angular/core';
import { MotionService } from './Services/motion.service';
import { MotionData } from './Model/MotionData.model';

@Component({
  selector: 'app-motion',
  templateUrl: './motion.component.html',
  styleUrl: './motion.component.scss'
})
export class MotionComponent implements OnInit, OnDestroy {
  
  constructor(private motionS: MotionService) {}
  motionData: MotionData = {};

  ngOnInit(): void {
    this.motionS.startMotionDetection((data: MotionData) => {
      this.motionData = data;
      console.log('Motion Data:', this.motionData);
    });
  }

  ngOnDestroy(): void {
    this.motionS.stopMotionDetection();
  }

  calculateBubblePosition(angle?: number): number {
    if (!angle) return 50;
    // Mapea el ángulo a una posición entre 0 y 100
    return Math.min(Math.max(50 + angle, 0), 100);
  }
}