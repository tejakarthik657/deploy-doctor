import { BackupManager } from "./backup";

export function rollbackFix(fix: any, projectRoot: string = process.cwd()) {
  const backup = new BackupManager(projectRoot);
  if (fix.patch.file) {
    backup.restoreBackup(`${fix.patch.file}.backup`);
  }
}

export function rollbackAll(projectRoot: string = process.cwd()) {
  const backup = new BackupManager(projectRoot);
  backup.rollbackAll();
}