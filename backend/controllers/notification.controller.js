import notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await notification.find({ to: userId }).populate(
            {
                "path": "from",
                select: "username profileImg"
            }
        );
        await notification.updateMany({ to: userId }, { read: true });

        res.status(200).json(notifications);
    } catch (error) {
        console.log("Error in getNotifications controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        await notification.deleteMany({ to: userId });
        res.status(200).json({ message: "Notifications deleted successfully" });
    } catch (error) {
         console.log("Error in deleteNotifications controller", error);
         res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const userId = req.user._id;
        const notification = await notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        if(notification.from.toString() !== userId.toString()){
            return res.status(401).json({ error: "Unauthorized, you can only delete your own notifications" });
        }
        await notification.findByIdAndDelete(notificationId);
        return res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        console.log("Error in deleteNotification controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
}