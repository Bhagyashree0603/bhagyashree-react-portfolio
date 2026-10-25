import awsImg from "./assets/images/projects/aws.png";
import devopsIllustration from "./assets/images/projects/a_clean_high_resolution_isolated_logo_style_illu.png";
import dockerImg from "./assets/images/projects/docker.png";
import githubImg from "./assets/images/projects/github.png";
import grafanaImg from "./assets/images/projects/grafana.png";
import projectImg1 from "./assets/images/projects/image_475d73b8.jpg";
import projectImg2 from "./assets/images/projects/image_84c893eb (1).jpg";
import jenkinsImg from "./assets/images/projects/jenkins.png";
import kubernetesImg from "./assets/images/projects/kubernetes.png";
import devopsGridImg from "./assets/images/projects/Neon DevOps Icon Grid.png";
import prometheusImg from "./assets/images/projects/prometheus (1).png";
import terraformImg from "./assets/images/projects/terraform.png";

const logotext = "Bhagyashree";
const meta = {
    title: "Bhagyashree Manglekar | Portfolio",
    description: "Bhagyashree Manglekar | React portfolio, AWS, and DevOps projects",
};

const introdata = {
    title: "I am Bhagyashree Manglekar",
    animated: {
        first: "I build React applications",
        second: "I explore AWS and DevOps",
        third: "I automate deployments",
    },
    description: "I am passionate about web development, cloud technologies, and DevOps. This portfolio showcases my learning journey and projects.",
    your_img_url: "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d",
};

const dataabout = {
    title: "About Me",
    aboutme: "I am Bhagyashree Manglekar, an aspiring cloud and DevOps professional interested in building, containerizing, and deploying web applications. I enjoy learning AWS, Docker, Terraform, Jenkins, and CI/CD practices through hands-on projects.",
};
const worktimeline = [{
        jobtitle: "React Portfolio Deployment",
        where: "Personal Project",
        date: "Current",
    },
    {
        jobtitle: "AWS and Terraform Practice",
        where: "Cloud Projects",
        date: "Current",
    },
    {
        jobtitle: "CI/CD Learning",
        where: "Jenkins and Docker",
        date: "Current",
    },
];

const skills = [{
        name: "AWS",
        value: 80,
    },
    {
        name: "Docker",
        value: 80,
    },
    {
        name: "Terraform",
        value: 75,
    },
    {
        name: "Jenkins CI/CD",
        value: 75,
    },
    {
        name: "React",
        value: 70,
    },
];

const services = [{
        title: "Frontend Development",
        description: "Building responsive user interfaces with React, JavaScript, HTML, and CSS.",
    },
    {
        title: "Cloud and DevOps",
        description: "Learning to provision cloud infrastructure and deploy applications with AWS, Docker, and Terraform.",
    },
    {
        title: "CI/CD Automation",
        description: "Automating build and deployment workflows using Jenkins and container images.",
    },
];

const dataportfolio = [
    { img: devopsGridImg, description: "DevOps Tools Overview", link: "#" },
    { img: githubImg, description: "Git and GitHub", link: "https://github.com/Bhagyashree0603" },
    { img: dockerImg, description: "Docker Containerization", link: "#" },
    { img: jenkinsImg, description: "Jenkins CI/CD Pipeline", link: "#" },
    { img: kubernetesImg, description: "Kubernetes Deployment", link: "#" },
    { img: terraformImg, description: "Terraform Infrastructure as Code", link: "#" },
    { img: awsImg, description: "AWS Cloud Projects", link: "#" },
    { img: prometheusImg, description: "Prometheus Monitoring", link: "#" },
    { img: grafanaImg, description: "Grafana Dashboards", link: "#" },
    { img: devopsIllustration, description: "DevOps Engineering", link: "#" },
    { img: projectImg1, description: "DevOps Project", link: "#" },
    { img: projectImg2, description: "React Portfolio Project", link: "#" },
];

const contactConfig = {
    YOUR_EMAIL: "name@domain.com",
    YOUR_FONE: "(555)123-4567",
    description: "For the contact form to send messages, configure your own EmailJS service, template, and public key below.",
    // creat an emailjs.com account 
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "service_id",
    YOUR_TEMPLATE_ID: "template_id",
    YOUR_USER_ID: "user_id",
};

const socialprofils = {
    github: "https://github.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
};
export {
    meta,
    dataabout,
    dataportfolio,
    worktimeline,
    skills,
    services,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
};

