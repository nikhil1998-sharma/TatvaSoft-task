import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { axiosClient } from "./utils/axiosClient";

const User = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [user, setUser] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const arr = [];

  for (let i = 0; i < numberOfPages; i++) {
    arr.push(i);
  }

  useEffect(() => {
    getUsers();
  }, [pageNo]);

  const getUsers = async () => {
    const response = await axiosClient.get("/", { params: { page: pageNo } });
    const { allUser, total } = response.data;
    setUser(allUser);
    setNumberOfPages(total);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onFormSubmit = async (e) => {
    const response = await axiosClient.post("/", { ...formData });
    closeModal();
  };

  const [searchString, setSearchString] = useState("");
  const [searchField, setSearchField] = useState("firstName");

  const prevPage = () => {
    setPageNo(!pageNo ? arr.length - 1 : pageNo - 1);
  };

  const nextPage = () => {
    setPageNo((pageNo + 1) % arr.length);
  };

  return (
    <div>
      {!isModalOpen && (
        <div className="bg-gray-100 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="w-1/6">
              <select
                onChange={(e) => setSearchField(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="status">Status</option>
              </select>
            </div>

            <div className="w-1/3">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
                  onChange={(e) => setSearchString(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={openModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Create New User
            </button>
          </div>

          <div className="max-w-full overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    First Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {user
                  ?.filter((item) => {
                    switch (searchField) {
                      case "firstName":
                        return searchString.toLowerCase() === ""
                          ? item
                          : item.firstName.toLowerCase().includes(searchString);
                        break;
                      case "lastName":
                        return searchString.toLowerCase() === ""
                          ? item
                          : item.lastName.toLowerCase().includes(searchString);
                        break;
                      case "email":
                        return searchString.toLowerCase() === ""
                          ? item
                          : item.email.toLowerCase().includes(searchString);
                        break;
                      case "phone":
                        return searchString.toLowerCase() === ""
                          ? item
                          : item.phone.toLowerCase().includes(searchString);
                        break;
                      case "status":
                        return searchString.toLowerCase() === ""
                          ? item
                          : item.phone.toLowerCase().includes(searchString);
                        break;
                      case "":
                        return item;
                    }
                  })
                  .map((item) => (
                    <tr key={item.email}>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {item.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.phone}
                      </td>
                      <td
                        className={
                          item.status === "Active"
                            ? "px-6 py-4 text-green-600 whitespace-nowrap"
                            : "px-6 py-4 text-red-500 whitespace-nowrap"
                        }
                      >
                        {item.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-500">Edit</button>
                        <button className="text-red-500">Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <ul className="flex justify-center pt-4 space-x-2">
            <button className="text-blue-500" onClick={prevPage}>
              Prev
            </button>
            {arr.map((item, i) => (
              <li>
                <a
                  href="#"
                  className={
                    pageNo === i
                      ? "px-3 py-1 bg-gray-200 rounded-md"
                      : "px-3 py-1  rounded-md"
                  }
                >
                  {item}
                </a>
              </li>
            ))}
            <button className="text-blue-500" onClick={nextPage}>
              Next
            </button>
          </ul>
        </div>
      )}

      <div className="bg-gray-100 p-4">
        {isModalOpen && (
          <div className="modal">
            <form className="bg-white p-8 rounded-md" action="#" method="post">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-4">Add New User</h2>
                <div class="bg-gray-100 p-4" onClick={closeModal}>
                  <button class="relative w-8 h-8 bg-red-500 text-white rounded-full">
                    X
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-600"
                >
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-600"
                >
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    onFormSubmit();
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="modal" onClick={closeModal}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
