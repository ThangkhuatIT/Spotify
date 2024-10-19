import Queue from 'bull'
import { sendConfirmMail } from './sendMail.services'
export const sendEmailQueue = new Queue(
  'sendEmail',
  `redis://default:6yqmn0jqWfmNNcVg94lnS3c8VUbLy1tX@redis-14804.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com:14804`,
  {
    redis: { maxRetriesPerRequest: null, enableReadyCheck: false }
  }
)
sendEmailQueue.process(async function (job, done) {
  const { newConfirmEmailToken, email, userId } = job.data
  try {
    await sendConfirmMail({
      token: newConfirmEmailToken,
      email,
      userId
    })
    done()
  } catch (error) {
    done(new Error('Failed to send email'))
  }
})
