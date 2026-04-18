import { Injectable } from '@angular/core';
import { getDhtmlxSchedulerEvents } from '../events';
import { SchedulerEvent } from './dhtmlx-scheduler';

@Injectable({
  providedIn: 'root',
})
export class SchedulerEventService {
  /**
   * Get sample events
   * In a real application, this would fetch from an API
   */
  getEvents(): Promise<SchedulerEvent[]> {
    return Promise.resolve(getDhtmlxSchedulerEvents());
  }

  /**
   * Create a new event
   * In a real application, this would POST to an API
   */
  createEvent(event: SchedulerEvent): Promise<SchedulerEvent> {
    return Promise.resolve({
      ...event,
      id: Date.now(), // Generate a temporary ID
    });
  }

  /**
   * Update an existing event
   * In a real application, this would PUT/PATCH to an API
   */
  updateEvent(event: SchedulerEvent): Promise<SchedulerEvent> {
    return Promise.resolve(event);
  }

  /**
   * Delete an event
   * In a real application, this would DELETE to an API
   */
  deleteEvent(id: number | string): Promise<void> {
    return Promise.resolve();
  }
}
