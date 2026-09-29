import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = "C:/Users/AdmiN/Documents/ChatGPT/MMAUG";
const SKILL_DIR = "C:/Users/AdmiN/.codex/plugins/cache/openai-primary-runtime/presentations/26.915.20218/skills/presentations";
const RUNTIME_PYTHON = "C:/Users/AdmiN/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe";
const FINAL_PPTX = path.join(workspaceDir, "outputs", "MMAUG_Azure_Fundamentals_Labs_v2.pptx");
const stagingDir = path.join(workspaceDir, ".codex-finalizer");
const { resolvePresentationFont, finalizePresentation } = await import(
  pathToFileURL(path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs")).href
);

await fs.mkdir(stagingDir, { recursive: true });
await fs.mkdir(path.dirname(FINAL_PPTX), { recursive: true });

const font = resolvePresentationFont();
const ppt = Presentation.create({ slideSize: { width: 1280, height: 720 } });
const C = {
  blue: "#0078D4", cyan: "#00A4EF", navy: "#17324D", ink: "#172033",
  muted: "#52606D", pale: "#EAF5FC", sky: "#D9F0FB", green: "#107C10",
  yellow: "#FFB900", red: "#D83B01", white: "#FFFFFF", cloud: "#F5F8FB",
  line: "#B9D7EA", gray: "#DCE4EA", darkGray: "#7A8793"
};
let slideNo = 0;

function box(slide, x, y, w, h, fill = C.white, radius = true, line = "none") {
  return slide.shapes.add({
    geometry: radius ? "roundRect" : "rect",
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: line === "none" ? { fill: "none", width: 0 } : { fill: line, width: 2 },
  });
}

function txt(slide, text, x, y, w, h, size = 24, color = C.ink, bold = false, align = "left") {
  const s = slide.shapes.add({
    geometry: "textbox",
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { fill: "none", width: 0 },
  });
  s.text = text;
  s.text.style = { typeface: font, fontSize: size, color, bold, alignment: align, autoFit: "shrinkText" };
  return s;
}

function line(slide, x, y, w, h, color = C.line, thickness = 3) {
  return slide.shapes.add({ geometry: "rect", position: { left: x, top: y, width: w, height: h }, fill: color, line: { fill: "none", width: 0 } });
}

function circle(slide, label, x, y, d, fill = C.blue, size = 24) {
  const s = slide.shapes.add({ geometry: "ellipse", position: { left: x, top: y, width: d, height: d }, fill, line: { fill: "none", width: 0 } });
  s.text = label;
  s.text.style = { typeface: font, fontSize: size, color: C.white, bold: true, alignment: "center", verticalAlignment: "middle", autoFit: "shrinkText" };
  return s;
}

function title(slide, heading, sub = "") {
  txt(slide, heading, 78, 42, 1130, 58, 34, C.navy, true);
  line(slide, 68, 110, 74, 5, C.blue, 0);
  if (sub) txt(slide, sub, 160, 88, 1048, 36, 18, C.muted);
}

function footer(slide, n) {
  txt(slide, `MMAUG Azure Fundamentals  |  ${String(n).padStart(2, "0")}`, 68, 682, 1140, 20, 11, C.darkGray);
}

function baseSlide(heading, sub = "") {
  const slide = ppt.slides.add();
  slideNo += 1;
  slide.background.fill = C.white;
  title(slide, heading, sub);
  footer(slide, slideNo);
  return slide;
}

function notes(slide, body) {
  slide.speakerNotes.textFrame.setText(body);
}

// 1 Cover
{
  const s = ppt.slides.add();
  slideNo = 1;
  s.background.fill = C.white;
  const cover = await fs.readFile(path.join(workspaceDir, "assets", "azure-cover.png"));
  s.images.add({ blob: cover, contentType: "image/png", alt: "Connected cloud services illustration", fit: "cover", position: { left: 0, top: 0, width: 1280, height: 720 } });
  txt(s, "Microsoft Azure\nFundamentals", 70, 140, 550, 170, 48, C.navy, true);
  txt(s, "Two-hour hands-on introduction", 74, 330, 460, 40, 25, C.blue, true);
  txt(s, "MMAUG 30-Day AI and DevOps Fundamentals Bootcamp", 74, 390, 500, 72, 19, C.muted);
  txt(s, "Learn the concepts. Build the environment. Clean it up.", 74, 594, 520, 48, 18, C.ink);
  notes(s, "Welcome learners and explain that the session moves from simple cloud concepts into six guided labs. Ask for a show of hands from anyone using Azure for the first time. Generated cover artwork created for this deck. No external factual source required.");
}

// 2 Journey
{
  const s = baseSlide("The learning journey", "Each idea prepares you for the next practical step");
  const labels = ["Cloud", "Azure", "Organize", "Build", "Protect", "Observe", "Control cost", "Clean up"];
  labels.forEach((v, i) => {
    const x = 74 + i * 145;
    circle(s, String(i + 1), x, 250, 64, i < 2 ? C.blue : i < 6 ? C.cyan : i === 6 ? C.yellow : C.green, 22);
    txt(s, v, x - 24, 330, 112, 48, 18, C.ink, true, "center");
    if (i < labels.length - 1) line(s, x + 64, 279, 82, 6, C.line);
  });
  txt(s, "The destination", 70, 474, 200, 36, 20, C.blue, true);
  txt(s, "A small Azure environment you can explain, validate, and remove safely", 70, 516, 1050, 58, 30, C.navy, true);
  notes(s, "Use this slide as the route map. The session follows the order shown, then finishes with hands-on validation and cleanup. Ask learners which step feels least familiar.");
}

// 3 Cloud
{
  const s = baseSlide("Cloud computing", "Rent technology services when you need them");
  txt(s, "On premises", 95, 160, 360, 46, 28, C.navy, true);
  box(s, 95, 220, 430, 300, C.cloud, true, C.gray);
  txt(s, "You buy and operate", 125, 250, 360, 36, 21, C.muted, true);
  ["Servers", "Power and cooling", "Hardware repairs", "Capacity planning"].forEach((v, i) => {
    circle(s, "", 130, 315 + i * 48, 18, C.darkGray, 1);
    txt(s, v, 164, 306 + i * 48, 300, 34, 21, C.ink);
  });
  txt(s, "Cloud", 745, 160, 360, 46, 28, C.blue, true);
  box(s, 745, 220, 430, 300, C.pale, true, C.line);
  txt(s, "A provider operates the platform", 775, 250, 360, 36, 21, C.blue, true);
  ["Use services on demand", "Scale when demand changes", "Pay for measured use", "Access global regions"].forEach((v, i) => {
    circle(s, "", 780, 315 + i * 48, 18, C.cyan, 1);
    txt(s, v, 814, 306 + i * 48, 310, 34, 21, C.ink);
  });
  txt(s, "Shared responsibility", 450, 574, 380, 34, 22, C.navy, true, "center");
  txt(s, "Microsoft secures the cloud. You secure what you put in it.", 260, 613, 760, 34, 18, C.muted, false, "center");
  notes(s, "Define cloud computing before using service names. Explain CapEx as buying equipment and OpEx as paying for ongoing use. Clarify that the customer still owns responsibilities such as identity, data, and configuration.");
}

// 4 Service models
{
  const s = baseSlide("IaaS, PaaS, and SaaS", "The service model changes how much you manage");
  const data = [
    ["IaaS", "Virtual machine", "You manage the operating system", C.blue],
    ["PaaS", "App Service", "You deploy the application", C.cyan],
    ["SaaS", "Microsoft 365", "You use the finished software", C.green],
  ];
  data.forEach((d, i) => {
    const x = 70 + i * 405;
    txt(s, d[0], x, 165, 350, 48, 34, d[3], true);
    box(s, x, 228, 350, 260, i === 0 ? "#EEF6FC" : i === 1 ? "#E7F8FC" : "#EDF8ED", true, d[3]);
    circle(s, String(i + 1), x + 26, 254, 58, d[3], 22);
    txt(s, d[1], x + 102, 257, 215, 38, 24, C.navy, true);
    txt(s, d[2], x + 28, 338, 292, 76, 20, C.ink);
  });
  txt(s, "More control", 82, 540, 220, 36, 18, C.muted);
  line(s, 220, 554, 800, 8, C.line);
  txt(s, "Less platform management", 970, 540, 230, 36, 18, C.muted, false, "right");
  notes(s, "Use a housing analogy if helpful. IaaS resembles renting an empty apartment, PaaS resembles a serviced apartment, and SaaS resembles a hotel room. Avoid stretching the analogy. Ask which model gives the customer the most operating system responsibility.");
}

// 5 Azure hierarchy
{
  const s = baseSlide("How Azure is organized", "Access and policy flow down through four levels");
  const levels = [
    ["Management group", "Organizes subscriptions", 160, C.navy],
    ["Subscription", "Billing and access boundary", 260, C.blue],
    ["Resource group", "Lifecycle container", 360, C.cyan],
    ["Resource", "VM, VNet, Storage, Web App", 460, C.green],
  ];
  levels.forEach((d, i) => {
    const width = 820 - i * 120;
    const x = 230 + i * 60;
    box(s, x, d[2], width, 72, d[3], true);
    txt(s, d[0], x + 28, d[2] + 17, 260, 40, 24, C.white, true);
    const descX = i === 3 ? x + 190 : x + 310;
    const descW = i === 3 ? width - 215 : width - 340;
    txt(s, d[1], descX, d[2] + 18, descW, 38, i === 3 ? 15 : 19, C.white, false, "right");
  });
  txt(s, "Think of folders for governance, not physical boxes", 290, 580, 700, 40, 21, C.muted, false, "center");
  notes(s, "Explain each level in plain language. Policies and role assignments at a higher scope can affect lower scopes. A resource group does not force all resources into one physical server or one region. Source: Microsoft Learn, Azure Resource Manager overview.");
}

// 6 Resource groups
{
  const s = baseSlide("Resource groups", "Related resources share one lifecycle");
  box(s, 90, 165, 1100, 360, C.cloud, true, C.blue);
  txt(s, "rg-mmaug-azurefundamentals", 125, 190, 700, 44, 28, C.blue, true);
  const names = [["VM", C.blue], ["VNet", C.cyan], ["Storage", C.green], ["Web App", C.yellow]];
  names.forEach((d, i) => {
    const x = 135 + i * 255;
    circle(s, d[0].slice(0, 2), x, 300, 92, d[1], 24);
    txt(s, d[0], x - 32, 410, 156, 38, 21, C.ink, true, "center");
  });
  txt(s, "Create together", 145, 560, 230, 36, 20, C.navy, true);
  txt(s, "Review together", 520, 560, 230, 36, 20, C.navy, true);
  txt(s, "Delete together", 895, 560, 230, 36, 20, C.red, true);
  notes(s, "Introduce the exact lab Resource Group name. Explain that deletion removes every contained resource. Pause on the word lifecycle. Ask what could go wrong if an unrelated production resource were placed in a temporary lab Resource Group.");
}

// 7 Compute
{
  const s = baseSlide("Azure compute choices", "Choose the simplest service that fits the workload");
  const rows = [
    ["Virtual Machine", "Full operating system control", "Legacy app or custom server", C.blue],
    ["App Service", "Managed web hosting", "Website or API", C.cyan],
    ["Functions", "Runs code after an event", "Short background task", C.green],
    ["Containers / AKS", "Packages and orchestrates services", "Complex container platform", C.yellow],
  ];
  rows.forEach((r, i) => {
    const y = 150 + i * 110;
    circle(s, String(i + 1), 80, y, 62, r[3], 22);
    txt(s, r[0], 172, y - 2, 280, 38, 24, C.navy, true);
    txt(s, r[1], 470, y - 2, 335, 38, 20, C.ink);
    txt(s, r[2], 825, y - 2, 350, 48, 19, C.muted);
    if (i < 3) line(s, 170, y + 73, 1000, 2, C.gray);
  });
  notes(s, "Keep containers and AKS conceptual. Explain that containerization alone does not require Kubernetes. For this workshop, the VM demonstrates IaaS and App Service demonstrates PaaS.");
}

// 8 VM anatomy
{
  const s = baseSlide("A virtual machine needs supporting resources", "The VM is one part of the deployed system");
  circle(s, "VM", 515, 245, 150, C.blue, 34);
  const items = [
    ["Image", "Starting OS", 120, 175, C.navy], ["Size", "CPU and memory", 120, 405, C.cyan],
    ["OS disk", "Persistent storage", 890, 175, C.green], ["NIC", "Network connection", 890, 405, C.yellow],
  ];
  items.forEach((d) => {
    box(s, d[2], d[3], 270, 105, C.cloud, true, d[4]);
    txt(s, d[0], d[2] + 24, d[3] + 18, 220, 34, 23, d[4], true);
    txt(s, d[1], d[2] + 24, d[3] + 56, 220, 28, 18, C.muted);
  });
  line(s, 390, 226, 130, 5, C.line); line(s, 390, 456, 130, 5, C.line);
  line(s, 665, 226, 225, 5, C.line); line(s, 665, 456, 225, 5, C.line);
  txt(s, "Lab rule: no internet-wide RDP rule", 385, 570, 510, 42, 23, C.red, true, "center");
  notes(s, "Explain each supporting resource before opening the VM creation page. The lab does not require signing in to the VM, so learners should choose no inbound ports unless the instructor explicitly approves a restricted rule. Source: Microsoft Learn, Windows VM quickstart.");
}

// 9 Networking
{
  const s = baseSlide("Azure networking", "Private address space connects the workload");
  box(s, 95, 155, 1090, 420, "#F4FAFD", true, C.blue);
  txt(s, "vnet-mmaug-demo    10.0.0.0/16", 130, 180, 650, 40, 25, C.blue, true);
  box(s, 155, 250, 760, 245, C.white, true, C.cyan);
  txt(s, "snet-workload    10.0.1.0/24", 190, 274, 520, 36, 22, C.cyan, true);
  circle(s, "NIC", 245, 352, 90, C.yellow, 22);
  circle(s, "VM", 465, 352, 90, C.blue, 26);
  line(s, 335, 394, 130, 6, C.line);
  box(s, 685, 340, 180, 110, "#FFF4E8", true, C.red);
  txt(s, "NSG", 720, 360, 110, 32, 24, C.red, true, "center");
  txt(s, "Traffic rules", 705, 401, 140, 26, 16, C.muted, false, "center");
  box(s, 960, 277, 165, 150, C.pale, true, C.blue);
  txt(s, "Public IP", 980, 308, 125, 34, 21, C.blue, true, "center");
  txt(s, "Optional\nin this lab", 982, 360, 120, 50, 17, C.muted, false, "center");
  txt(s, "/16 is a larger range. /24 is a smaller range inside it.", 205, 525, 760, 34, 19, C.muted);
  notes(s, "Explain VNet first, then subnet, NIC, IP addresses, and NSG. Avoid detailed subnet mathematics. The public IP does not create access by itself. The NSG must also permit traffic. Direct internet exposure increases risk.");
}

// 10 Storage
{
  const s = baseSlide("Azure Storage", "One account can provide several storage services");
  circle(s, "ST", 90, 250, 130, C.blue, 34);
  txt(s, "Storage account", 65, 400, 180, 38, 22, C.navy, true, "center");
  const services = [["Blob", "Files and objects", C.cyan], ["Files", "Shared folders", C.green], ["Queues", "Messages", C.yellow], ["Tables", "Key-value data", C.navy]];
  services.forEach((d, i) => {
    const x = 325 + i * 220;
    box(s, x, 210, 185, 150, C.cloud, true, d[2]);
    txt(s, d[0], x + 20, 235, 145, 38, 25, d[2], true, "center");
    txt(s, d[1], x + 15, 292, 155, 45, 17, C.muted, false, "center");
    line(s, 220, 311, x - 220, 5, C.line);
  });
  txt(s, "Lab choice: private Blob container with LRS", 330, 430, 700, 46, 28, C.navy, true, "center");
  txt(s, "LRS keeps local copies. ZRS spreads copies across zones. GRS also copies data to another region.", 170, 510, 940, 64, 19, C.muted, false, "center");
  notes(s, "Explain Blob as object storage for files. Keep the container private. Mention that storage account names are globally unique and allow only lowercase letters and numbers. Source: Microsoft Learn, Azure Storage redundancy and Blob portal quickstart.");
}

// 11 Identity
{
  const s = baseSlide("Identity and Azure RBAC", "Authentication confirms identity. Authorization grants access.");
  box(s, 80, 170, 500, 180, C.pale, true, C.blue);
  txt(s, "Authentication", 115, 205, 420, 42, 28, C.blue, true);
  txt(s, "Who are you?", 115, 267, 420, 44, 25, C.ink);
  box(s, 700, 170, 500, 180, "#EDF8ED", true, C.green);
  txt(s, "Authorization", 735, 205, 420, 42, 28, C.green, true);
  txt(s, "What may you do?", 735, 267, 420, 44, 25, C.ink);
  txt(s, "Azure RBAC scope", 80, 415, 260, 34, 22, C.navy, true);
  const scope = ["Management group", "Subscription", "Resource group", "Resource"];
  scope.forEach((v, i) => {
    const x = 80 + i * 285;
    box(s, x, 475, 245, 72, i === 2 ? C.blue : C.cloud, true, i === 2 ? C.blue : C.gray);
    txt(s, v, x + 12, 494, 221, 34, 19, i === 2 ? C.white : C.ink, i === 2, "center");
  });
  txt(s, "Least privilege: grant only the access needed for the task", 250, 594, 780, 40, 22, C.red, true, "center");
  notes(s, "Introduce Microsoft Entra ID as the identity system. Explain Reader, Contributor, and Owner in simple terms. Students must not change RBAC in the bootcamp environment. Ask why Owner would be excessive for someone who only needs to view resources.");
}

// 12 App Service
{
  const s = baseSlide("Azure App Service", "A managed platform for websites and APIs");
  const left = [["Patch the operating system", C.darkGray], ["Configure the web server", C.darkGray], ["Deploy application files", C.blue], ["Monitor and scale", C.cyan]];
  txt(s, "Virtual Machine", 120, 160, 350, 42, 27, C.navy, true);
  left.forEach((d, i) => {
    box(s, 120, 225 + i * 72, 410, 54, i < 2 ? C.cloud : C.pale, true, d[1]);
    txt(s, d[0], 145, 238 + i * 72, 360, 30, 19, C.ink, i >= 2);
  });
  txt(s, "App Service", 760, 160, 350, 42, 27, C.blue, true);
  [["Microsoft manages the platform", C.green], ["You deploy the application", C.blue]].forEach((d, i) => {
    box(s, 760, 255 + i * 115, 410, 82, i === 0 ? "#EDF8ED" : C.pale, true, d[1]);
    txt(s, d[0], 790, 278 + i * 115, 350, 40, 22, C.ink, true, "center");
  });
  txt(s, "Lab deployment", 500, 570, 280, 34, 20, C.blue, true, "center");
  txt(s, "index.html in a ZIP package", 425, 608, 430, 34, 22, C.navy, true, "center");
  notes(s, "Contrast IaaS and PaaS responsibilities. The Web App receives an HTTPS hostname. The App Service plan supplies compute. ZIP deployment requires index.html at the package root. Source: Microsoft Learn, Deploy files to Azure App Service.");
}

// 13 Monitoring
{
  const s = baseSlide("Monitoring", "Azure records health, performance, and changes");
  const items = [
    ["Metrics", "Numbers over time", C.blue], ["Logs", "Detailed records", C.cyan],
    ["Alerts", "Notification after a condition", C.yellow], ["Activity Log", "Who changed a resource", C.green],
  ];
  items.forEach((d, i) => {
    const x = 70 + i * 302;
    circle(s, String(i + 1), x + 80, 190, 84, d[2], 26);
    txt(s, d[0], x, 305, 245, 40, 24, C.navy, true, "center");
    txt(s, d[1], x, 357, 245, 62, 18, C.muted, false, "center");
  });
  box(s, 235, 485, 810, 92, C.cloud, true, C.line);
  txt(s, "Lab task", 270, 510, 130, 34, 20, C.blue, true);
  txt(s, "Find a successful resource creation event in the Resource Group Activity Log", 410, 503, 590, 52, 21, C.ink);
  notes(s, "Clarify that Activity Log records control-plane changes, not the content of application requests. Ask learners to name one event they expect to see after completing the labs.");
}

// 14 Cost
{
  const s = baseSlide("Cost management", "Every resource has a lifecycle and a cost consequence");
  const stages = [["Estimate", "Pricing calculator", C.blue], ["Observe", "Cost analysis", C.cyan], ["Control", "Budgets and alerts", C.yellow], ["Remove", "Delete unused resources", C.green]];
  stages.forEach((d, i) => {
    const x = 75 + i * 300;
    circle(s, String(i + 1), x, 205, 78, d[2], 25);
    txt(s, d[0], x - 35, 310, 150, 36, 23, C.navy, true, "center");
    txt(s, d[1], x - 55, 360, 190, 56, 18, C.muted, false, "center");
    if (i < 3) line(s, x + 78, 240, 220, 6, C.line);
  });
  box(s, 185, 490, 910, 90, "#FFF4E8", true, C.red);
  txt(s, "Cost notice", 225, 515, 180, 38, 23, C.red, true);
  txt(s, "VMs and App Service plans can charge while idle. Cleanup ends the lab.", 420, 509, 620, 50, 21, C.ink);
  notes(s, "Do not quote prices because they vary by region, agreement, and date. Explain that students may not have permission to create budgets. Stopping a VM is not the same as deleting its disk, public IP, or other resources.");
}

// 15 Lab route
{
  const s = baseSlide("Two-hour hands-on route", "Six labs, validation, and cleanup");
  const labs = [
    ["1", "Portal", "10 min", C.blue], ["2", "Resource group", "10 min", C.cyan],
    ["3", "Virtual machine", "30 min", C.blue], ["4", "Networking", "10 min", C.cyan],
    ["5", "Blob storage", "20 min", C.green], ["6", "App Service", "25 min", C.yellow],
    ["7", "Validate", "5 min", C.navy], ["8", "Cleanup", "5 min", C.red],
  ];
  labs.forEach((d, i) => {
    const row = i < 4 ? 0 : 1;
    const col = i % 4;
    const x = 70 + col * 300;
    const y = 165 + row * 220;
    circle(s, d[0], x, y, 64, d[3], 22);
    txt(s, d[1], x + 86, y + 2, 190, 34, 21, C.navy, true);
    txt(s, d[2], x + 86, y + 42, 150, 28, 17, C.muted);
  });
  box(s, 315, 570, 650, 58, C.pale, true, C.blue);
  txt(s, "If the VM deployment runs long, inspect the prepared VM and continue", 338, 585, 605, 30, 18, C.blue, true, "center");
  notes(s, "Set expectations before the labs. Keep the clock visible. Ask learners to stop and raise a hand if their subscription or region differs. Use the prepared VM if deployment remains incomplete after the planned checkpoint.");
}

// 16 Lab topology
{
  const s = baseSlide("The environment you will build", "All lab resources live inside one Resource Group");
  box(s, 55, 142, 1170, 455, C.cloud, true, C.blue);
  txt(s, "rg-mmaug-azurefundamentals", 82, 160, 500, 36, 23, C.blue, true);
  box(s, 90, 230, 530, 300, C.white, true, C.cyan);
  txt(s, "Compute and network", 120, 252, 350, 32, 21, C.cyan, true);
  box(s, 130, 315, 420, 150, C.pale, true, C.line);
  txt(s, "vnet-mmaug-demo", 160, 330, 230, 32, 19, C.blue, true);
  circle(s, "NIC", 170, 383, 70, C.yellow, 14);
  line(s, 240, 416, 83, 5, C.line);
  circle(s, "VM", 323, 380, 80, C.blue, 22);
  txt(s, "NSG", 438, 398, 75, 28, 18, C.red, true, "center");
  box(s, 680, 230, 230, 132, "#EDF8ED", true, C.green);
  txt(s, "Storage", 710, 250, 170, 30, 20, C.green, true, "center");
  txt(s, "Private Blob", 710, 303, 170, 30, 18, C.ink, false, "center");
  box(s, 955, 230, 230, 132, "#FFF4E8", true, C.yellow);
  txt(s, "App Service", 985, 250, 170, 30, 20, C.navy, true, "center");
  txt(s, "Static web page", 985, 303, 170, 30, 18, C.ink, false, "center");
  box(s, 680, 410, 505, 90, C.white, true, C.line);
  txt(s, "Activity Log", 715, 430, 170, 30, 20, C.blue, true);
  txt(s, "Creation events and failures", 900, 430, 240, 32, 18, C.muted);
  notes(s, "Walk through the topology from left to right. Ask learners to point to the resources that belong to networking, storage, and web hosting. Reinforce that one cleanup action targets the complete Resource Group.");
}

// 17 validation
{
  const s = baseSlide("Validation and safe troubleshooting", "Read the first specific error before changing settings");
  const checks = [["Subscription", "Correct bootcamp context"], ["Resource Group", "Exact lab name"], ["Deployment", "Provisioning succeeded"], ["Security", "No anonymous Blob or open RDP"], ["Application", "HTTPS page loads"]];
  checks.forEach((d, i) => {
    const y = 150 + i * 82;
    circle(s, "✓", 82, y, 48, C.green, 21);
    txt(s, d[0], 155, y + 3, 260, 34, 21, C.navy, true);
    txt(s, d[1], 430, y + 3, 390, 34, 19, C.muted);
  });
  box(s, 865, 170, 330, 340, "#FFF4E8", true, C.red);
  txt(s, "Common blockers", 900, 198, 260, 40, 24, C.red, true, "center");
  txt(s, "Permission denied\n\nRegion or size unavailable\n\nName already used\n\nPolicy blocked the setting", 908, 265, 245, 205, 20, C.ink);
  txt(s, "Ask the instructor before changing scope, role, region, or security rules.", 815, 548, 390, 72, 18, C.red, true, "right");
  notes(s, "Model calm troubleshooting. Check subscription, exact resource, and deployment details. Do not make unnecessary RBAC changes. Do not weaken network or storage security to make an error disappear.");
}

// 18 cleanup
{
  const s = baseSlide("Cleanup completes the lab", "Delete the exact Resource Group and verify the result");
  box(s, 120, 175, 1040, 105, "#FFF4E8", true, C.red);
  txt(s, "Deleting a Resource Group permanently deletes every resource inside it", 160, 205, 960, 48, 27, C.red, true, "center");
  const steps = [["1", "Review contents"], ["2", "Confirm exact name"], ["3", "Delete Resource Group"], ["4", "Verify it is gone"]];
  steps.forEach((d, i) => {
    const x = 80 + i * 300;
    circle(s, d[0], x, 365, 72, i === 3 ? C.green : C.blue, 25);
    txt(s, d[1], x - 45, 460, 165, 58, 20, C.navy, true, "center");
    if (i < 3) line(s, x + 72, 398, 225, 6, C.line);
  });
  box(s, 345, 570, 590, 56, C.cloud, true, C.gray);
  txt(s, "az group exists --name rg-mmaug-azurefundamentals", 370, 585, 540, 30, 18, C.ink, true, "center");
  txt(s, "Expected: false", 500, 635, 280, 30, 18, C.green, true, "center");
  notes(s, "Read the warning aloud. Learners must inspect the Resource Group before deletion and stop if anything looks unfamiliar. The final CLI result should be false. Source: Microsoft Learn, Delete Azure Resource Groups.");
}

const candidatePath = path.join(stagingDir, "azure-fundamentals-candidate.pptx");
await (await PresentationFile.exportPptx(ppt)).save(candidatePath);

const result = await finalizePresentation({
  workspaceDir,
  candidatePath,
  finalPath: FINAL_PPTX,
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: ["--expected-slide-size-emu", "12192000,6858000", "--validate-heading-fit"],
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
  fontPolicy: { basis: "design", families: [font] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, "MMAUG_Azure_Fundamentals_Labs_v2.validation.json"),
});

console.log(JSON.stringify({ final: FINAL_PPTX, slides: ppt.slides.length, font, result }, null,