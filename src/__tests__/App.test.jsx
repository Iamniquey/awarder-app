import { describe, expect, it } from "vitest";
import App from "../App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  
  it("should render inital score value on load", () => {
    // Setup
    render(<App />);
    const initalScore = 0;

    // Exercise
    const score = Number(screen.getByTestId("score").textContent);

    // Verify
    expect(score).toBe(initalScore);
  });

  it("should render inital award value on load", () => {
    // Setup
    render(<App />);
    const initalAward = "";

    // Exercise
    const award = screen.getByPlaceholderText("action").value;

    // Verify
    expect(award).toBe(initalAward);
  });

  it("should render inital award number value on load", () => {
    // Setup
    render(<App />);
    const initalAwardNumber = 0;

    // Exercise
    const awardNumber = Number(screen.getByPlaceholderText("points").value);

    // Verify
    expect(awardNumber).toBe(initalAwardNumber);
  });

  it("should render nothing for the initial session record on load", async() => {
    // Setup
    render(<App />);
    const initalSessionRecord = "";

    // Exercise
    const previewButton = screen.getByText("Preview");
    await userEvent.click(previewButton);
    const sessionRecord = screen.getByTestId("session-record").textContent;

    // Verify
    expect(sessionRecord).toBe(initalSessionRecord);
  });

  it("should restore score from localStorage when available", () => {
    // Setup
    const storedScore = 50;
    const mockData = {
      score: storedScore,
      sessionRecord: ["+50 for helping"],
    };
    localStorage.setItem("allData", JSON.stringify(mockData));
  
    render(<App />);

    // Exercise
    const restoredScore = Number(screen.getByTestId("score").textContent);

    // Verify
    expect(restoredScore).toBe(storedScore);
  });

  it("should restore sessionRecord from localStorage when available", async() => {
    // Setup
    const storedSessionRecord = "+50 for helping";
    const mockData = {
      score: 50,
      sessionRecord: [storedSessionRecord],
    };
    localStorage.setItem("allData", JSON.stringify(mockData));
    
    render(<App />);

    // Exercise
    const previewButton = screen.getByText("Preview");
    await userEvent.click(previewButton);
    const sessionRecord = screen.getByTestId("session-record").textContent;

    // Verify
    expect(sessionRecord).toBe(storedSessionRecord);
  });

  it("should update score when an award is added", async()=>{
    render(<App />);
    const pronButton = screen.getByText("pron");
    const pointButton = screen.getByText("3");
    const addButton = screen.getByText("+");
    
    
    await userEvent.click(pronButton);
    await userEvent.click(pointButton);
    await userEvent.click(addButton);
    const score = Number(screen.getByTestId("score").textContent);
    
    expect(score).toBe(3);
  })
});
