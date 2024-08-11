import Queue from "bull";
import Config from "../config";
import { sendConfirmMail } from "./sendMail.service";
export const sendEmailQueue = new Queue(
  "sendEmail",
  `redis://default:RQAwhM21ZA9FuXIC9xdndms4dEuLrzbu@redis-13953.c1.ap-southeast-1-1.ec2.redns.redis-cloud.com:13953`,
  {
    redis: { maxRetriesPerRequest: null, enableReadyCheck: false },
  }
);
sendEmailQueue.process(async function (job, done) {
  const { newConfirmEmailToken, email, userId } = job.data;
  try {
    await sendConfirmMail({
      token: newConfirmEmailToken,
      email,
      userId,
    });
    done();
  } catch (error) {
    done(new Error("Failed to send email"));
  }
});
