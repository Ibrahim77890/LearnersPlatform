import React from "react";

const Course = () => {
  const mockData = [
    {
      id: "1",
      name: "CocaCola",
    },
    {
      id: "2",
      name: "Pepsi",
    },
  ];

  return (
    <div className="min-w-screen min-h-screen bg-gray-300 overflow-hidden text-black">
      <div class="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4 flex-row">
      <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden top-0 left-0 overflow-hidden">
          <img
            className="w-full"
            alt=""
            src="https://i.ibb.co/QMdWfzX/component-image-one.png"
          />
        </div>
        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6 overflow-auto flex-1">
          <div class="border-b border-black pb-6">
            <h1 class="lg:text-3xl text-xl font-semibold lg:leading-6 leading-7 mt-2">
              Professional Ethics
            </h1>
          </div>
          <p className="text-xl pt-6 pb-3 font-bold">Description</p>
          <p className="font-sans text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="text-xl pt-6 pb-3 font-bold">Instructor</p>
          <p className="font-sans text-justify pb-3">
            Professor Ahmed Ali Mirza
          </p>
          <p className="text-xl pt-6 pb-3 font-bold">Price</p>
          <p className="font-sans text-justify pb-3">
            $ 16.99/-
          </p>
          <p className="text-xl pt-6 font-bold">Course Contents</p>
          <table className="w-full h-fit mb-8">
            <thead>
              <tr>
                <th>Chapter</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map(
                (
                  item,
                  index // Corrected order of parameters
                ) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <button class="dark:bg-blue dark:hover:bg-gray-10 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none">
            <svg
              class="mr-3 text-white"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.02301 7.18999C7.48929 6.72386 7.80685 6.12992 7.93555 5.48329C8.06425 4.83666 7.9983 4.16638 7.74604 3.55724C7.49377 2.94809 7.06653 2.42744 6.51835 2.06112C5.97016 1.6948 5.32566 1.49928 4.66634 1.49928C4.00703 1.49928 3.36252 1.6948 2.81434 2.06112C2.26615 2.42744 1.83891 2.94809 1.58665 3.55724C1.33439 4.16638 1.26843 4.83666 1.39713 5.48329C1.52583 6.12992 1.8434 6.72386 2.30968 7.18999L4.66634 9.54749L7.02301 7.18999Z"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.66699 4.83333V4.84166"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.69 13.8567C14.1563 13.3905 14.4738 12.7966 14.6025 12.15C14.7312 11.5033 14.6653 10.8331 14.413 10.2239C14.1608 9.61476 13.7335 9.09411 13.1853 8.72779C12.6372 8.36148 11.9926 8.16595 11.3333 8.16595C10.674 8.16595 10.0295 8.36148 9.48133 8.72779C8.93314 9.09411 8.5059 9.61476 8.25364 10.2239C8.00138 10.8331 7.93543 11.5033 8.06412 12.15C8.19282 12.7966 8.51039 13.3905 8.97667 13.8567L11.3333 16.2142L13.69 13.8567Z"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.333 11.5V11.5083"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Enroll In Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course;
