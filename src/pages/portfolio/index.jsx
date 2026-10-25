import React, { useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";

const toolDetails = {
  "DevOps Tools Overview": {
    description: "An overview of the tools used across modern DevOps workflows.",
    concepts: ["Version control", "CI/CD automation", "Containers", "Cloud infrastructure", "Monitoring"],
  },
  "Git and GitHub": {
    description: "Git tracks source-code changes, while GitHub hosts repositories and supports collaboration.",
    concepts: ["Git commits and branches", "GitHub repositories", "Pull requests", "Version control"],
  },
  "Docker Containerization": {
    description: "Docker packages an application and its dependencies into portable containers.",
    concepts: ["Dockerfile", "Docker images", "Containers", "Port mapping"],
  },
  "Jenkins CI/CD Pipeline": {
    description: "Jenkins automates build, validation, and deployment tasks through pipeline workflows.",
    concepts: ["Jenkinsfile", "Pipeline stages", "Automated builds", "Continuous delivery"],
  },
  "Kubernetes Deployment": {
    description: "Kubernetes manages containerized applications and helps maintain their desired state.",
    concepts: ["Pods", "Deployments", "Services", "Scaling", "NodePort"],
  },
  "Terraform Infrastructure as Code": {
    description: "Terraform provisions and manages infrastructure through declarative configuration files.",
    concepts: ["HCL configuration", "Providers", "Plan and apply", "Infrastructure as Code"],
  },
  "AWS Cloud Projects": {
    description: "AWS provides cloud services for computing, storage, networking, and application deployment.",
    concepts: ["Cloud infrastructure", "IAM permissions", "EC2", "Container registry"],
  },
  "Prometheus Monitoring": {
    description: "Prometheus collects and stores time-series metrics for monitoring applications and infrastructure.",
    concepts: ["Metrics collection", "PromQL", "Targets", "Alerting"],
  },
  "Grafana Dashboards": {
    description: "Grafana visualizes monitoring data through dashboards and panels.",
    concepts: ["Dashboards", "Panels", "Data sources", "Monitoring visualization"],
  },
  "DevOps Engineering": {
    description: "DevOps brings development and operations together through automation and continuous feedback.",
    concepts: ["Automation", "CI/CD", "Infrastructure as Code", "Observability"],
  },
  "DevOps Project": {
    description: "A project showcase for applying DevOps practices to application delivery.",
    concepts: ["Source control", "Containerization", "Deployment", "Monitoring"],
  },
  "React Portfolio Project": {
    description: "A React-based portfolio website showcasing development work and DevOps learning.",
    concepts: ["React", "Responsive UI", "Docker deployment", "Kubernetes", "CI/CD"],
  },
};

export const Portfolio = () => {
  const [selected, setSelected] = useState(null);

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Portfolio | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        <Row className="mb-4 mt-3 pt-md-3">
          <Col lg="10">
            <h1 className="display-4 mb-3">DevOps Portfolio</h1>
            <p>
              Explore my DevOps tools, cloud technologies, monitoring stack,
              and application deployment projects.
            </p>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>

        <div className="mb-5 po_items_ho">
          {dataportfolio.map((data, i) => (
            <div key={`${data.description}-${i}`} className="po_item">
              <img
                src={data.img}
                alt={data.description}
                loading="lazy"
              />
              <div className="content">
                <h5>{data.description}</h5>
                <p>
                  {toolDetails[data.description]?.description ||
                    "Explore this project and the technologies behind it."}
                </p>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => setSelected(data)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Modal
          show={Boolean(selected)}
          onHide={() => setSelected(null)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {selected?.description || "Project Details"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {selected
                ? toolDetails[selected.description]?.description ||
                  "This portfolio item showcases my technical learning."
                : ""}
            </p>
            <h6>Key concepts</h6>
            <ul>
              {(toolDetails[selected?.description]?.concepts || [
                "Technology overview",
                "Project learning",
              ]).map((concept) => (
                <li key={concept}>{concept}</li>
              ))}
            </ul>
            {selected?.link && selected.link !== "#" && (
              <Button
                variant="primary"
                href={selected.link}
                target="_blank"
                rel="noreferrer"
              >
                Visit Project
              </Button>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelected(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </HelmetProvider>
  );
};
