package be.stijnhooft.portal.frontend.core.constants;

import org.junit.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;

public class ApplicationPathsTest {

    @Test
    public void urls() throws Exception {
        assertThat(ApplicationPaths.urls().size(), equalTo(1));
    }

}