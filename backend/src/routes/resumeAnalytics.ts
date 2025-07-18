import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { ResumeAnalyticsController } from '../controllers/ResumeAnalyticsController';

const router = Router();
const analyticsController = new ResumeAnalyticsController();

// Get resume analytics
router.get('/:resumeId/analytics', authenticateToken, async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const analytics = await analyticsController.getResumeAnalytics(resumeId, userId);
    res.json(analytics);
  } catch (error) {
    console.error('Resume analytics error:', error);
    res.status(500).json({ error: 'Failed to get resume analytics' });
  }
});

// Get skills analysis
router.get('/:resumeId/skills-analysis', authenticateToken, async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const skillsAnalysis = await analyticsController.getSkillsAnalysis(resumeId, userId);
    res.json(skillsAnalysis);
  } catch (error) {
    console.error('Skills analysis error:', error);
    res.status(500).json({ error: 'Failed to get skills analysis' });
  }
});

// Get experience timeline
router.get('/:resumeId/experience-timeline', authenticateToken, async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const timeline = await analyticsController.getExperienceTimeline(resumeId, userId);
    res.json(timeline);
  } catch (error) {
    console.error('Experience timeline error:', error);
    res.status(500).json({ error: 'Failed to get experience timeline' });
  }
});

// Get improvement suggestions
router.get('/:resumeId/suggestions', authenticateToken, async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const suggestions = await analyticsController.getImprovementSuggestions(resumeId, userId);
    res.json(suggestions);
  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ error: 'Failed to get improvement suggestions' });
  }
});

export default router; 