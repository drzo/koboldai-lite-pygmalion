export class WorldInfo {
  constructor() {
    this.entries = new Map();
  }

  addEntry(key, content, selective = false, constant = false, selective_keys = []) {
    const entry = {
      key,
      content,
      selective,
      constant,
      selective_keys,
      enabled: true
    };
    this.entries.set(key, entry);
  }

  removeEntry(key) {
    this.entries.delete(key);
  }

  toggleEntry(key) {
    const entry = this.entries.get(key);
    if (entry) {
      entry.enabled = !entry.enabled;
    }
  }

  getActiveEntries(context) {
    const active = [];
    for (const entry of this.entries.values()) {
      if (!entry.enabled) continue;

      if (entry.constant) {
        active.push(entry.content);
        continue;
      }

      if (entry.selective) {
        const hasSelectiveKey = entry.selective_keys.some(key => 
          context.toLowerCase().includes(key.toLowerCase())
        );
        if (hasSelectiveKey) {
          active.push(entry.content);
        }
      } else if (context.toLowerCase().includes(entry.key.toLowerCase())) {
        active.push(entry.content);
      }
    }
    return active;
  }

  toJSON() {
    return Array.from(this.entries.entries());
  }

  fromJSON(json) {
    this.entries.clear();
    for (const [key, entry] of json) {
      this.entries.set(key, entry);
    }
  }
}