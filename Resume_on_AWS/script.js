// Used on the resume to make the employment history interactive (each job is clickable)
document.addEventListener("DOMContentLoaded", function () {
  // Placeholder array with employment history data
  const employmentHistory = [
    {
      id: 1,
      title: "Assistant Manager",
      company: "India Bond Private Limited",
      years: "August 2023 - Present",
      description:
        "Train users to use Zoho CRM, Zoho Desk, Zoho Campaign, and Zoho Analytics. Consult with staff to arrange promotional campaigns for products, and organizations in WhatsApp and email media types. Inspect event facilities to ensure that they conform to customer requirements and SEBI. Run the WhatsApp campaigns using Interakt. Prepare reports summarizing information and trends related to sales performance. Provide CRM support to junior staff and RMs. Collaborate with system architects, software architects, design analysts, and others to understand business or industry requirements.",
    },
    {
      id: 2,
      title: "Team Lead - Technical",
      company: "CRM Masters Infotech LLP",
      years: "December 2020 - August 2023",
      description: "Description of what you did",
    },
    {
      id: 3,
      title: "Software Engineer (Developer)",
      company: "Gars Infotech Private Limited",
      years: "June 2018 - June 2020",
      description: "Description of what you did",
    },
    // Add more entries as needed
  ];

  const timeline = document.getElementById("timeline");

  // Create timeline entries
  employmentHistory.forEach((job) => {
    // Entry container for job
    const entry = document.createElement("div");
    entry.className = "entry";
    entry.id = "entry-" + job.id;

    // Title header for job
    const header = document.createElement("div");
    header.className = "entry-header";
    header.innerText = job.title;

    // Content container for job, initially hidden
    const content = document.createElement("div");
    content.className = "entry-content";
    content.innerHTML = `<strong>Company:</strong> ${job.company}<br>
                             <strong>Years:</strong> ${job.years}<br>
                             <p>${job.description}</p>`;
    content.style.display = "none";

    // Append header and content to the entry
    entry.appendChild(header);
    entry.appendChild(content);

    // Event listener to toggle content visibility
    header.addEventListener("click", function () {
      // Check if the clicked header's content is currently shown
      const isContentShown = content.style.display === "block";
      // Hide all open contents
      document.querySelectorAll(".entry-content").forEach((el) => {
        el.style.display = "none"; // Hide content
      });
      // Deactivate all headers
      document.querySelectorAll(".entry").forEach((el) => {
        el.classList.remove("active"); // Remove active class
      });

      if (!isContentShown) {
        // If it was not shown before, display it
        content.style.display = "block";
        entry.classList.add("active");
      } // If it was shown, it will be hidden as part of the above loop
    });

    timeline.appendChild(entry);
  });
});
