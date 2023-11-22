export function AboutPage() {
  return (
    <div className="lg:px-40 md:px-10 sm:px-10 lg:text-2xl md:text-xl sm:text-lg">
      <div className="flex justify-center w-auto">
        <img
          src="images/NAS-logo.png"
          alt="Nurses Assignment Sheet logo"
          className="h-20 w-20 m-12"
        />
      </div>
      <div className="font-nunito flex flex-col items-start mb-48">
        <div className="flex w-auto items-center flex-row">
          <img
            className="h-40 sm:h-56"
            src="images/about1.png"
            alt="A picture of nurse and an elderly patient who is on her wheelchair looking into the garden"
          />
          <h3 className="font-extrabold tracking-tight text-center lg:text-4xl md:text-3xl sm:text-3xl">
            {" "}
            What is the NAS?
          </h3>
        </div>

        <div className="text-nunito-400 tracking-tight p-4">
          <p className="my-4">
            The NAS (Nurses Assignment Sheet) is an electronic document that
            replaces the paper based nurses assignment sheet used in some
            healthcare settings. It is used to communicate vital information to
            nurses throughout the shift.
          </p>
          <p className="my-4">
            The NAS provides nurses with clear patient assignments and outlines
            their expected duties. Additionally, the NAS enables efficient
            information sharing among healthcare professionals and
            administrative staff by providing a comprehensive overview of
            patient assignments and workload for a given shift in the unit.
          </p>
        </div>
      </div>

      <div className="font-nunito flex flex-col items-start mb-48">
        <div className="flex w-auto items-center flex-row">
          <img
            className="h-40 sm:h-56"
            src="images/about2.png"
            alt="A picture of nurse and an elderly patient who is on her wheelchair"
          />
          <h3 className="text-nunito-900 font-extrabold tracking-tight text-center lg:text-4xl md:text-3xl sm:text-3xl">
            Why Use the NAS?
          </h3>
        </div>

        <div className="text-nunito-400 tracking-tight p-4 text-grey">
          <p className="my-4">
            Using the NAS offers several advantages including, but not limited
            to:
          </p>
          <ul className="list">
            <p className="text-green font-bold">Efficiency:</p>
            <li className="my-4 ">
              Electronic assignment sheets streamline the process of assigning
              and communicating patient information to nurses. They eliminate
              the need for manual entry and allow for real-time updates,
              reducing administrative burden and saving time.
            </li>

            <p className="text-green font-bold">Error Reduction:</p>
            <li className="my-4 ">
              Electronic nurses' assignment sheets contribute to a reduction in
              errors compared to their paper-based counterparts. With electronic
              systems, information can be entered and updated accurately,
              minimizing the risk of transcription errors, illegible
              handwriting, or duplication errors.
            </li>

            <p className="text-green font-bold">Data Analysis and Reporting:</p>
            <li className="my-4 ">
              Electronic systems can capture and store data, allowing for
              analysis and reporting on patient outcomes, workload distribution,
              and overall unit performance. This data-driven approach helps
              healthcare facilities identify trends, optimize resource
              allocation, and make informed decisions to improve patient care
              and operational efficiency.{" "}
            </li>

            <p className="text-green font-bold">Environmental Impact:</p>
            <li className="my-4 ">
              Shifting from paper-based assignment sheets to electronic ones
              reduces paper consumption and promotes sustainability. This
              environmentally-friendly approach aligns with the goals of
              healthcare organizations to minimize waste and adopt greener
              practices.{" "}
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div className="font-nunito flex flex-col mb-48 items-start">
          <div className="flex w-auto items-center flex-row">
            <img
              className="h-40 sm:h-56"
              src="images/about3.png"
              alt="A picture of nurse looking at paper documenation"
            />
            <h3 className="text-nunito-900 font-extrabold tracking-tight text-center lg:text-4xl md:text-3xl sm:text-3xl">
              The unique features of the NAS:
            </h3>
          </div>

          <div className="flex flex-col">
            <div className="text-nunito-400 tracking-tight p-4 text-grey">
              <h4 className="text-green font-bold my-4">Regulated Access</h4>
              <p className="">
                Electronic nurses' assignment sheets offer regulated access,
                ensuring that only authorized users can view and make changes to
                the document. Access can be restricted to healthcare
                professionals involved in patient care, preventing unauthorized
                individuals from tampering with or accessing sensitive
                information.
              </p>
            </div>

            <div className="text-nunito-400 tracking-tight p-4 text-grey">
              <h4 className="text-green font-bold my-4">
                Creating Electronic Sheets for Future Dates
              </h4>
              <p className="">
                With the NAS, healthcare professionals can effortlessly generate
                electronic sheets for future dates, enabling them to plan and
                organize patient information in advance. This powerful feature
                streamlines the process of preparing for upcoming shifts,
                eliminating the need for manual data entries and ensuring the
                information is up-to-date and accurate.
              </p>
            </div>

            <div className="text-nunito-400 tracking-tight p-4 text-grey">
              <h4 className="text-green font-bold my-4">
                Duplication Safeguards
              </h4>
              <p className="">
                Electronic nurses' assignment sheets incorporate safeguards to
                prevent the duplication of nurses' names, patient names, or room
                numbers. The electronic system can employ validation rules and
                checks to ensure that each entry is unique and that no
                duplicates are allowed. This helps avoid confusion, potential
                mix-ups, or errors caused by inadvertently assigning multiple
                nurses to the same patient or assigning the same patient to
                multiple nurses. By implementing these safeguards, the
                electronic assignment sheet promotes accuracy, reduces the risk
                of data duplication, and contributes to maintaining clear and
                unambiguous patient assignments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
