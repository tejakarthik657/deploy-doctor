import fs from "fs";
import { BackupManager } from "./backup";

export function applyFix(fix: any, projectRoot: string = process.cwd()) {
  if (!fix.patch.file) return; // manual fix

  const backup = new BackupManager(projectRoot);
  const file = fix.patch.file;
  backup.createBackup(file);

  const content = fs.readFileSync(file, "utf-8");
  const obj = JSON.parse(content);
  const newObj = fix.patch.apply(obj);
  fs.writeFileSync(file, JSON.stringify(newObj, null, 2));
}