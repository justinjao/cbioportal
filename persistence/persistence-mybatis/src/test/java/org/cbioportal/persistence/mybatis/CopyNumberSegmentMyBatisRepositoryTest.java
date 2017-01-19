package org.cbioportal.persistence.mybatis;

import org.cbioportal.model.CopyNumberSeg;
import org.cbioportal.model.meta.BaseMeta;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigDecimal;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/testContextDatabase.xml")
@Configurable
public class CopyNumberSegmentMyBatisRepositoryTest {
    
    @Autowired
    private CopyNumberSegmentMyBatisRepository copyNumberSegmentMyBatisRepository;

    @Test
    public void getCopyNumberSegmentsInSampleInStudyIdProjection() throws Exception {

        List<CopyNumberSeg> result = copyNumberSegmentMyBatisRepository.getCopyNumberSegmentsInSampleInStudy(
            "study_tcga_pub", "TCGA-A1-A0SB-01", "ID", null, null, null, null);

        Assert.assertEquals(2, result.size());
        CopyNumberSeg copyNumberSeg = result.get(0);
        Assert.assertEquals((Integer) 50236594, copyNumberSeg.getSegId());
        Assert.assertEquals((Integer) 1, copyNumberSeg.getCancerStudyId());
        Assert.assertEquals("study_tcga_pub", copyNumberSeg.getCancerStudyIdentifier());
        Assert.assertEquals((Integer) 1, copyNumberSeg.getSampleId());
        Assert.assertEquals("TCGA-A1-A0SB-01", copyNumberSeg.getSampleStableId());
        Assert.assertEquals("1", copyNumberSeg.getChr());
        Assert.assertEquals((Integer) 324556, copyNumberSeg.getStart());
        Assert.assertEquals((Integer) 180057677, copyNumberSeg.getEnd());
        Assert.assertNull(copyNumberSeg.getNumProbes());
        Assert.assertNull(copyNumberSeg.getSegmentMean());
    }

    @Test
    public void getCopyNumberSegmentsInSampleInStudySummaryProjection() throws Exception {

        List<CopyNumberSeg> result = copyNumberSegmentMyBatisRepository.getCopyNumberSegmentsInSampleInStudy(
            "study_tcga_pub", "TCGA-A1-A0SB-01", "SUMMARY", null, null, null, null);

        Assert.assertEquals(2, result.size());
        CopyNumberSeg copyNumberSeg = result.get(0);
        Assert.assertEquals((Integer) 50236594, copyNumberSeg.getSegId());
        Assert.assertEquals((Integer) 1, copyNumberSeg.getCancerStudyId());
        Assert.assertEquals("study_tcga_pub", copyNumberSeg.getCancerStudyIdentifier());
        Assert.assertEquals((Integer) 1, copyNumberSeg.getSampleId());
        Assert.assertEquals("TCGA-A1-A0SB-01", copyNumberSeg.getSampleStableId());
        Assert.assertEquals("1", copyNumberSeg.getChr());
        Assert.assertEquals((Integer) 324556, copyNumberSeg.getStart());
        Assert.assertEquals((Integer) 180057677, copyNumberSeg.getEnd());
        Assert.assertEquals((Integer) 291, copyNumberSeg.getNumProbes());
        Assert.assertEquals(new BigDecimal("0.0519"), copyNumberSeg.getSegmentMean());
    }

    @Test
    public void getCopyNumberSegmentsInSampleInStudyDetailedProjection() throws Exception {

        List<CopyNumberSeg> result = copyNumberSegmentMyBatisRepository.getCopyNumberSegmentsInSampleInStudy(
            "study_tcga_pub", "TCGA-A1-A0SB-01", "DETAILED", null, null, null, null);

        Assert.assertEquals(2, result.size());
        CopyNumberSeg copyNumberSeg = result.get(0);
        Assert.assertEquals((Integer) 50236594, copyNumberSeg.getSegId());
        Assert.assertEquals((Integer) 1, copyNumberSeg.getCancerStudyId());
        Assert.assertEquals("study_tcga_pub", copyNumberSeg.getCancerStudyIdentifier());
        Assert.assertEquals((Integer) 1, copyNumberSeg.getSampleId());
        Assert.assertEquals("TCGA-A1-A0SB-01", copyNumberSeg.getSampleStableId());
        Assert.assertEquals("1", copyNumberSeg.getChr());
        Assert.assertEquals((Integer) 324556, copyNumberSeg.getStart());
        Assert.assertEquals((Integer) 180057677, copyNumberSeg.getEnd());
        Assert.assertEquals((Integer) 291, copyNumberSeg.getNumProbes());
        Assert.assertEquals(new BigDecimal("0.0519"), copyNumberSeg.getSegmentMean());
    }

    @Test
    public void getCopyNumberSegmentsInSampleInStudySummaryProjection1PageSize() throws Exception {

        List<CopyNumberSeg> result = copyNumberSegmentMyBatisRepository.getCopyNumberSegmentsInSampleInStudy(
            "study_tcga_pub", "TCGA-A1-A0SB-01", "SUMMARY", 1, 0, null, null);
        
        Assert.assertEquals(1, result.size());
    }

    @Test
    public void getCopyNumberSegmentsInSampleInStudySummaryProjectionStartSort() throws Exception {

        List<CopyNumberSeg> result = copyNumberSegmentMyBatisRepository.getCopyNumberSegmentsInSampleInStudy(
            "study_tcga_pub", "TCGA-A1-A0SB-01", "SUMMARY", null, null, "start", "ASC");
        
        Assert.assertEquals(2, result.size());
        Assert.assertEquals((Integer) 224556, result.get(0).getStart());
        Assert.assertEquals((Integer) 324556, result.get(1).getStart());
    }

    @Test
    public void getMetaCopyNumberSegmentsInSampleInStudy() throws Exception {

        BaseMeta result = copyNumberSegmentMyBatisRepository.getMetaCopyNumberSegmentsInSampleInStudy("study_tcga_pub",
            "TCGA-A1-A0SB-01");

        Assert.assertEquals((Integer) 2, result.getTotalCount());
    }
}