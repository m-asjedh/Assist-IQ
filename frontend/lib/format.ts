export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString();
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function statusBadgeColor(status: string): string {
  switch (status.toUpperCase()) {
    case "COMPLETED":
    case "RESOLVED":
    case "ACTIVE":
      return "green";
    case "PROCESSING":
    case "OPEN":
    case "UPLOADED":
      return "orange";
    case "WAITING":
      return "blue";
    case "FAILED":
    case "INACTIVE":
      return "pink";
    default:
      return "gray";
  }
}

export function documentStatusLabel(status: string): string {
  switch (status) {
    case "COMPLETED":
      return "Trained";
    case "PROCESSING":
      return "Processing";
    case "UPLOADED":
      return "Uploaded";
    case "FAILED":
      return "Failed";
    default:
      return status;
  }
}
