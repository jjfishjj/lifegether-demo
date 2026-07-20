# LifeGether Firestore 資料庫設計

## Collections

### `users/{uid}`

- `displayName`, `email`, `photoURL`
- `role`: `member | host | moderator | admin`
- `status`: `active | suspended`
- `createdAt`, `lastLoginAt`

### `events/{eventId}`

- 基本：`title`, `category`, `type`, `coverImg`, `status`
- 時地：`startAt`, `endAt`, `location`, `isOnline`, `meetingUrl`
- 容量：`maxParticipants`, `price`, `currency`
- 內容：`targetAudience`, `outcome`, `description`, `agenda`, `facilitator`
- 支持：`followUp`, `requirements`, `refundPolicy`, `contactEmail`
- 權限：`ownerId`, `moderationStatus`, `createdAt`, `updatedAt`

`status`: `draft | published | cancelled | completed`

`moderationStatus`: `pending | approved | rejected`

### `events/{eventId}/registrations/{uid}`

- `status`: `pending | approved | waitlisted | cancelled | attended`
- `answers`, `paymentStatus`, `registeredAt`, `updatedAt`

### `events/{eventId}/sessions/{sessionId}`

- `title`, `startAt`, `endAt`, `facilitatorId`, `capacity`

### `auditLogs/{logId}`

- `actorId`, `action`, `resourceType`, `resourceId`, `before`, `after`, `createdAt`

### `reports/{reportId}`

- `reporterId`, `eventId`, `reason`, `details`, `status`, `handledBy`, `createdAt`

## 權限原則

- 公開使用者只能讀取 `published + approved` 活動。
- 登入會員只能建立自己的活動與報名資料。
- 主辦人只能修改自己擁有的活動。
- `moderator/admin` 權限必須由伺服器 Custom Claims 判定，不能相信前端傳值。
- 所有審核、上下架與退款操作寫入 `auditLogs`。
