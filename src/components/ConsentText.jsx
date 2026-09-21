/** Mirrors the approved Informed Consent Form. Keep the two in sync. */
export default function ConsentText() {
  return (
    <div className="consent">
      <h1>Everyday situations and language</h1>
      <p>
        You are invited to take part in a research study. Please read this before you decide.
        You can take as long as you like and you can ask questions before you start.
      </p>
      <p className="consent-key">
        Taking part has nothing to do with your enrollment at St. Cloud State University, your
        grades, your academic standing, or your immigration status or visa. This study is not
        connected to any office that handles those things. No one who makes decisions about your
        enrollment or your immigration will see your answers. If you decide not to take part, or
        you start and then stop, nothing happens and no one is told.
      </p>

      <h2>Who is running it</h2>
      <p>
        Shreyash Parajuli, a graduate student in the Department of Computing, Informatics and
        Data Science, supervised by Dr. Bhaskar Ghosh.
      </p>

      <h2>What it is about</h2>
      <p>
        Which everyday situations are hard for international students who recently arrived in
        the United States, when they have to use English. Things like buying groceries, sorting
        out a bus ticket, talking to a doctor, or making small talk with a classmate.
      </p>

      <h2>What you will do</h2>
      <p>
        Answer questions on your own device. It takes about 10 to 13 minutes. You may also read a
        few short example conversations with an AI practice partner and tell us what you think
        of them. These examples were written in advance. Nothing you type is sent to any AI
        system. You can skip any question and stop at any time by closing the page.
      </p>

      <h2>Who else benefits</h2>
      <p>
        The researcher is also a co-founder of a small company developing an AI practice partner
        called NAVI. What we learn from this study may help shape a product in the future. Only
        group-level findings would ever be used that way. Your individual answers are never sold,
        and never shared with anyone outside the research team.
      </p>

      <h2>Risks and benefits</h2>
      <p>
        The risks are small. Some people find it slightly uncomfortable to think about times
        when language did not go well. There is no direct benefit to you other than a short
        summary of your own answers at the end. There is no payment for taking part.
      </p>

      <h2>Your answers</h2>
      <p>
        Your name, student ID and IP address are never collected. Answers are stored with a
        random code. Only the researcher and his faculty advisor can see the data. If you give
        an email address at the end, it is kept separately from your answers and deleted when
        the study is finished. Results describe groups of people, never individuals.
        De-identified answers are kept for at least three years and may be used in future
        related research.
      </p>

      <h2>Voluntary participation</h2>
      <p>
        Participating in this study is completely voluntary. Your decision whether or not to
        participate will not affect your current or future relations with St. Cloud State
        University or the researcher. If you decide to participate, you can withdraw at any time
        without penalty.
      </p>

      <h2>Questions</h2>
      <p>
        Shreyash Parajuli, shreyash.parajuli@go.stcloudstate.edu. Faculty advisor Dr. Bhaskar
        Ghosh, bhaskar.ghosh@stcloudstate.edu. Questions about your rights as a research
        participant: Dr. Jen Ouellette-Schramm, IRB Chair, jen.ouellette-schramm@stcloudstate.edu,
        or Candy Swenson, IRB Administrator, cmswenson1@stcloudstate.edu.
      </p>
      <p className="muted">SCSU IRB protocol number: pending approval</p>
    </div>
  )
}
