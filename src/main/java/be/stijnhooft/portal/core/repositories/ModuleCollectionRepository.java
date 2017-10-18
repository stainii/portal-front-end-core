package be.stijnhooft.portal.core.repositories;

import be.stijnhooft.portal.core.model.ModuleCollection;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;

@Repository
public class ModuleCollectionRepository {

    @PersistenceContext
    private EntityManager em;

    public Optional<ModuleCollection> findDefault() {
        return em.createNamedQuery(ModuleCollection.FIND_DEFAULT, ModuleCollection.class)
                .getResultList()
                .stream()
                .findAny();
    }

    @Transactional
    public ModuleCollection create(ModuleCollection moduleCollection) {
        em.persist(moduleCollection);
        return moduleCollection;
    }

    public void flush() {
        em.flush();
    }
}
