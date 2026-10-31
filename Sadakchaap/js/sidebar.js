
function displayRoadInfo(road) {
    const sidebar = document.getElementById("sidebar");

    // Clear the previous information.
    sidebar.replaceChildren();

    // Road name.
    const heading = document.createElement("h2");
    heading.textContent = road.roadName;
    sidebar.appendChild(heading);

    // Named after.
    addSidebarSection(
        sidebar,
        "Named after",
        road.namedAfter || "Information not yet available"
    );

    // Person's title or description.
    if (road.title) {
        addSidebarSection(sidebar, "About", road.title);
    }

    // Biography.
    addSidebarSection(
        sidebar,
        "Biography",
        road.bio || "Biography coming soon."
    );

    // Interesting fact.
    if (road.interestingFact) {
        addSidebarSection(
            sidebar,
            "Tags",
            road.interestingFact
        );
    }

    // Sources.
    if (road.sources && road.sources.length > 0) {
        const section = document.createElement("section");
        section.className = "sidebar-section";

        const heading = document.createElement("h3");
        heading.textContent = "Sources";
        section.appendChild(heading);

        const list = document.createElement("ul");

        road.sources.forEach(function (source) {
            const item = document.createElement("li");
            item.textContent = source;
            list.appendChild(item);
        });

        section.appendChild(list);
        sidebar.appendChild(section);
    }
}

// Helper to create a section in the sidebar.
function addSidebarSection(sidebar, title, content) {
    const section = document.createElement("section");
    section.className = "sidebar-section";

    const heading = document.createElement("h3");
    heading.textContent = title;

    const paragraph = document.createElement("p");
    paragraph.textContent = content;

    section.appendChild(heading);
    section.appendChild(paragraph);

    sidebar.appendChild(section);
}

// Display an error or status message.
function showRoadError(message) {
    const sidebar = document.getElementById("sidebar");

    const notice = document.createElement("p");
    notice.className = "error-message";
    notice.textContent = message;

    sidebar.appendChild(notice);
}
