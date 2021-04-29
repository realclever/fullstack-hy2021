import React from "react";

const Course = ({ courses }) => {
  console.log(courses);
  return (
    <>
      <Header courses={courses} />
      <Content courses={courses} />
      <Total courses={courses} />
    </>
  );
};

const Header = ({ courses }) => {
  return (
    <>
      <h2>{courses.name}</h2>
    </>
  );
};

const Content = ({ courses }) => {
  //console.log();
  return (
    <>
      {courses.parts.map((p) => (
        <Parts key={p.id} part={p} />
      ))}
    </>
  );
};

const Parts = ({ part }) => {
  //console.log();
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  );
};

const Total = ({ courses }) => {
  const total = courses.parts.reduce((s, p) => s + p.exercises, 0);
  return (
    <>
      <b>Total of {total} exercises</b>
    </>
  );
};

export default Course;
