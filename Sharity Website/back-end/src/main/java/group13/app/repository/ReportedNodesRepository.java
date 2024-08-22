package group13.app.repository;


import group13.app.model.ReportedNodes;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ReportedNodesRepository extends CrudRepository<ReportedNodes, Integer> {


}
