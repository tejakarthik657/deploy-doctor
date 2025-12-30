import fs from "fs";
import path from "path";

export class BackupManager {
  private backupDir: string;

  constructor(projectRoot: string) {
    this.backupDir = path.join(projectRoot, ".deploy-doctor", "backups");
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  createBackup(filePath: string): string {
    const backupPath = path.join(this.backupDir, `${path.basename(filePath)}.backup`);
    if (fs.existsSync(filePath)) {
      fs.copyFileSync(filePath, backupPath);
    }
    return backupPath;
  }

  restoreBackup(backupPath: string): void {
    const originalPath = backupPath.replace('.backup', '');
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, originalPath);
      fs.unlinkSync(backupPath);
    }
  }

  rollbackAll(): void {
    const files = fs.readdirSync(this.backupDir);
    for (const file of files) {
      if (file.endsWith('.backup')) {
        this.restoreBackup(path.join(this.backupDir, file));
      }
    }
  }
}