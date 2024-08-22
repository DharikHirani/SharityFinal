package group13.app.model;

import group13.app.repository.ReportedNodesRepository;

import javax.persistence.*;
import java.io.Serializable;



@Entity
public class ReportedNodes implements Serializable {
   private static final long serialVersionUID = 1L;
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
//    private String LocationName;
    private String ReportMessage;

    @ManyToOne(targetEntity = Location.class, fetch = FetchType.LAZY, optional = false)
    private Location location;

    public void setID(int ID) {
        this.ID = ID;
    }
    public int getID() {
        return this.ID;
    }


    public String getReportMessage() {
        return ReportMessage;
    }

    public void setReportMessage(String reportMessage) {
        ReportMessage = reportMessage;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}



