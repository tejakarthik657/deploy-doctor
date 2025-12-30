import fs from "fs";
import path from "path";
import https from "https";

export class RuleSyncer {
  private rulesUrl = "https://raw.githubusercontent.com/deploy-doctor/rules/main/rules.json";
  private localRulesPath: string;

  constructor(projectRoot: string) {
    this.localRulesPath = path.join(projectRoot, ".deploy-doctor", "remote-rules.json");
  }

  async syncRules(): Promise<void> {
    try {
      const remoteRules = await this.fetchRemoteRules();
      fs.writeFileSync(this.localRulesPath, JSON.stringify(remoteRules, null, 2));
    } catch (error) {
      console.warn("Failed to sync remote rules:", error);
    }
  }

  getLocalRules(): any[] {
    if (fs.existsSync(this.localRulesPath)) {
      return JSON.parse(fs.readFileSync(this.localRulesPath, "utf-8"));
    }
    return [];
  }

  private fetchRemoteRules(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      https.get(this.rulesUrl, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      }).on('error', reject);
    });
  }
}