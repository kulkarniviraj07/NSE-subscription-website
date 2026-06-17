const failedRepo =
    require(
        "../repositories/failedJobRepository"
    );

const jobRepo =
    require(
        "../repositories/downloadJobRepository"
    );

const repo =
    require(
        "../repositories/announcementRepository"
    );

// Retry a not-yet-available PDF up to this many times. With the ~20s backoff
// in failedJobRepository.claimRetryable, this covers ~2.5 min of exchange
// file-propagation delay using fast retries, instead of the old 2-min waits.
const MAX_RETRIES = 8;

async function retryFailed() {

    let jobs;

    try {

        jobs =
            await failedRepo.claimRetryable(
                MAX_RETRIES
            );

    }
    catch (err) {

        console.log(
            "\nRecovery Error:"
        );

        console.log(
            err.message
        );

        return;

    }

    if (
        jobs.length === 0
    ) {

        return;

    }

    console.log(
        `
Retrying Failed Downloads:
${jobs.length}
`
    );

    for (
        const task
        of jobs
    ) {

        try {

            await repo.updateStatus(

                task.url,

                "PENDING"

            );

            await jobRepo.add(

                task.url,

                task.filename

            );

            console.log(
                `Requeued (attempt ${task.retries}/${MAX_RETRIES}): ${task.filename}`
            );

        }
        catch (err) {

            console.log(
                `Requeue Failed: ${task.filename}`
            );

            console.log(
                err.message
            );

        }

    }

}

module.exports =
    retryFailed;
