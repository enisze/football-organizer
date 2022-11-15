export const useNotifications = (body?: string) => {
  if (!body) return;
  if (typeof window !== "undefined" && "Notification" in window) {
    const permission = Notification.permission;

    if (permission === "default") {
      window.Notification.requestPermission();
    }

    if (permission === "granted") {
      if (document.visibilityState === "visible") {
        return;
      }

      const notification = new Notification("Bezahlung steht noch aus", {
        body: `Hey, du hast für das Event am ${body} noch nicht bezahlt :)`,
      });
      notification.onclick = () => {
        window.parent.focus();
        notification.close();
      };
    }
  }
};
