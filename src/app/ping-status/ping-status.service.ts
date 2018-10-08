import { Injectable } from '@angular/core';

enum PingStatus {
	Unpinged,
	Pinging,
	PingSuccesful,
	PingFailed
};

@Injectable({
	providedIn: 'root'
})
export class PingStatusService {

	private pingStatus: PingStatus;
	
	constructor() { 
		this.setUnpinged();
	}

	public isPingSuccesful(): boolean {
		return this.pingStatus == PingStatus.PingSuccesful;
	}

	public isPingFailed(): boolean {
		return this.pingStatus == PingStatus.PingFailed;
	}

	public isPinging(): boolean {
		return this.pingStatus == PingStatus.Pinging;
	}

	public setPingSuccesful(): void {
		this.pingStatus = PingStatus.PingSuccesful;
	}

	public setPingFailed(): void {
		this.pingStatus = PingStatus.PingFailed;
	}

	public setPinging(): void {
		this.pingStatus = PingStatus.Pinging;
	}

	public setUnpinged(): void {
		this.pingStatus = PingStatus.Unpinged;
	}
}
