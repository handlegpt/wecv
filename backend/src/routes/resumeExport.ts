import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { ResumeExportController } from '../controllers/ResumeExportController';

const router = Router();
const exportController = new ResumeExportController();

// Export resume in various formats
router.post('/:resumeId/export', authenticateToken, async (req, res) => {
  try {
    const { resumeId } = req.params;
    const { format, data } = req.body;
    const userId = req.user.id;

    const exportedFile = await exportController.exportResume(resumeId, userId, format, data);
    
    res.setHeader('Content-Type', exportController.getContentType(format));
    res.setHeader('Content-Disposition', `attachment; filename=resume-${resumeId}.${format}`);
    res.send(exportedFile);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Failed to export resume' });
  }
});

// Generate shareable link
router.post('/:resumeId/share', authenticateToken, async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;
    const { expiresIn } = req.body; // in hours

    const shareLink = await exportController.generateShareLink(resumeId, userId, expiresIn);
    res.json({ shareLink });
  } catch (error) {
    console.error('Share link error:', error);
    res.status(500).json({ error: 'Failed to generate share link' });
  }
});

// Get shared resume (public access)
router.get('/shared/:shareToken', async (req, res) => {
  try {
    const { shareToken } = req.params;
    
    const resume = await exportController.getSharedResume(shareToken);
    res.json(resume);
  } catch (error) {
    console.error('Get shared resume error:', error);
    res.status(404).json({ error: 'Shared resume not found or expired' });
  }
});

// Get export history
router.get('/:resumeId/exports', authenticateToken, async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const exports = await exportController.getExportHistory(resumeId, userId);
    res.json(exports);
  } catch (error) {
    console.error('Export history error:', error);
    res.status(500).json({ error: 'Failed to get export history' });
  }
});

export default router; 