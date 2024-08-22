package group13.app.processor;
import opennlp.tools.stemmer.PorterStemmer;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Component("filteredLocations")
public class FilteredLocations {

	String[] religiousInstitutions = {
		"Church",
		"Mosque",
		"Synagogue",
		"Temple",
		"Salvation",
		"Army",
		"Holy",
		"Religious",
		"Chapel",
		"Parish"
	};
}
