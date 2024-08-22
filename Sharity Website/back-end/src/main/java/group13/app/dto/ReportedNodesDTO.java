package group13.app.dto;

import group13.app.model.Event;
import group13.app.model.Location;
import group13.app.model.ReportedNodes;

public class ReportedNodesDTO {
	private int ID;
	public int getID() {
		return ID;
	}

	public void setID(int iD) {
		ID = iD;
	}

	public String getReportMessage() {
		return ReportMessage;
	}

	public void setReportMessage(String reportMessage) {
		ReportMessage = reportMessage;
	}

	public LocationDTO getLocation() {
		return location;
	}

	public void setLocation(LocationDTO location) {
		this.location = location;
	}

	private String ReportMessage;
	private LocationDTO location;
	
	public ReportedNodesDTO (ReportedNodes report) {
		this.ID = report.getID();
		this.ReportMessage = report.getReportMessage();
		this.location = new LocationDTO(report.getLocation());
	}
	
	
}
