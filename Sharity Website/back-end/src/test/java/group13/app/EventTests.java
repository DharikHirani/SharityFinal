package group13.app;

import java.sql.Date;
import java.time.LocalTime;
import java.util.Calendar;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EventTests {

	@Test
	public void addEventTest() {
		
		String title = "Charity Event";
		Calendar c = Calendar.getInstance();
		c.set(2021, Calendar.FEBRUARY, 25, 10, 0, 0);
		Date date = new Date(c.getTimeInMillis());
		LocalTime startTime = LocalTime.parse("10:00");
		c.set(2021, Calendar.FEBRUARY, 25, 14, 0, 0);
		LocalTime endTime = LocalTime.parse("14:00"); 
		
//		try {
//			
//		}
	}
}
