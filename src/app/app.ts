import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SchedulerComponent, SchedulerEvent } from './components/scheduler';
import { KeyboardLegendComponent } from './components/keyboard-legend';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SchedulerComponent, KeyboardLegendComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('scheduler-accessibility-demo');
  protected readonly legendId = signal('scheduler-keyboard-legend');
  protected readonly initialDate = signal(new Date(2024, 9, 7)); // October 7, 2024
  
  // Sample events for the scheduler
  protected readonly events = signal<SchedulerEvent[]>([
    {
      id: 1,
      start_date: '2024-10-07 09:00',
      end_date: '2024-10-07 13:00',
      text: 'Team Meeting',
    },
    {
      id: 2,
      start_date: '2024-10-08 10:00',
      end_date: '2024-10-08 12:00',
      text: 'Project Review',
    },
    {
      id: 3,
      start_date: '2024-10-09 14:00',
      end_date: '2024-10-09 16:00',
      text: 'Client Presentation',
    },
    {
      id: 4,
      start_date: '2024-10-10 11:00',
      end_date: '2024-10-10 12:30',
      text: 'Lunch Meeting',
    },
  ]);

  protected onEventCreated(event: SchedulerEvent): void {
    console.log('Event created:', event);
    // In a real app, you would update the events signal and/or send to backend
  }

  protected onEventUpdated(event: SchedulerEvent): void {
    console.log('Event updated:', event);
    // In a real app, you would update the events signal and/or send to backend
  }

  protected onEventDeleted(event: { id: number | string }): void {
    console.log('Event deleted:', event);
    // In a real app, you would update the events signal and/or send to backend
  }
}
