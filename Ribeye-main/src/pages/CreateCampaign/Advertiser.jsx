import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition, Menu } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import Loader from "../../utils/Loader";
import { toast } from "react-toastify";
import isEmpty from "../../helpers/is-empty";

const category = [
  { name: "Arts & Entertainment", key: "570395e8-203e-403d-93d0-e1c158721890" },
  { name: "Automotive", key: "f5e64948-0391-4620-a379-5bce24e4420b" },
  { name: "Business", key: "c60d9000-876a-4ab7-8de0-d5b94f4acb96" },
  { name: "Careers", key: "9cce0b54-c257-4ab2-a268-34e44fe63968" },
  { name: "Education", key: "86aadb79-b51a-4c41-9823-71658377a789" },
  { name: "Family & Parenting", key: "4ba92e68-9cfa-4a93-92af-128a6d33fa02" },
  { name: "Food & Drink", key: "2753744a-b38f-457b-affa-3bcae8cd9c28" },
  { name: "Health & Fitness", key: "8e3bdc07-6786-45b9-b53a-9af23b03589b" },
  { name: "Hobbies & Interests", key: "5d601345-875e-4d0a-99af-d2d6a27f2eb4" },
  { name: "Home & Garden", key: "ef4490e9-352f-4834-bee2-fa7e6f153437" },
  {
    name: "Law, Gov't & Politics",
    key: "bf9588b3-255d-42f3-b2a6-a2dd4bf96e20",
  },
  { name: "News", key: "37d69c68-9a0a-40dd-be37-6a7aadb7d8b5" },
  { name: "Personal Finance", key: "99bc14a1-d9db-4efc-8345-1d03224f6fcb" },
  { name: "Pets", key: "89e2ed69-1431-4dcc-a8e0-6286209e4a46" },
  { name: "Real Estate", key: "d4c9a374-0421-4733-9a8f-5f29a58f6571" },
  {
    name: "Religion & Spirituality",
    key: "7961f67f-7605-4129-9cba-3b3b68ce49e6",
  },
  { name: "Science", key: "193b5676-75ce-4f6b-890f-a9c3654e95f8" },
  { name: "Shopping", key: "8174bc0e-886b-410d-91e6-06e3f1445b27" },
  { name: "Society", key: "5c8808c2-9397-4dde-90ab-cd4966ca714d" },
  { name: "Sports", key: "47eb60da-eeea-4558-9a6d-3d9e2115415d" },
  { name: "Style & Fashion", key: "bf528a67-3da4-481b-ba1b-25b4ccd15081" },
  {
    name: "Technology & Computing",
    key: "cd6f1cdc-7e61-4703-a0f4-142be9aab4d9",
  },
  { name: "Travel", key: "ad23e3cb-8003-46e7-9908-1ed764687745" },
];

const Advertiser = ({
  editForm,
  singleAdvertiser,
  selectAdvertiser,
  setSelectAdvertiser,
  campaignformValues,
  setCampaignFormValues,
}) => {
  const [isLoading, setIsLoading] = useState();
  const [isCreateAdvertiserLoading, setIsCreateAdvertiserLoading] = useState();
  const [showCreateAdv, setShowCreateAdv] = useState(false);
  const [selected, setSelected] = useState(category[0]);
  const [selectCateg, setSelectCateg] = useState(false);
  const [advertiserList, setAdvertiserList] = useState([]);

  const [categoryList, setCategoryList] = useState([]);

  const [advertiserFormValues, setAdvertiserFormValues] = useState({
    client_ref: "WMZKSZES",
    type: "brand",
    name: "",
    adomain: "",
    marketing_name: "",
    store_url: "",
    category_ids: {},
    is_conversion_capping_enabled: true,
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setAdvertiserFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
        marketing_name: prevState.name,
      };
    });
  };

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(
        `https://ribeye-one.vercel.app/api/v1/advertisers?client_api_ref=WMZKSZES`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setIsLoading(true);
        let datas = [];

        const mappedRequests = res.data.data.map((el) => {
          return axios.get(
            `https://ribeye-one.vercel.app/api/v1/advertisers/${el.public_identifier}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        });

        Promise.all(mappedRequests)
          .then((responses) => {
            responses.forEach((response, idx) => {
              datas.push({ ...response.data.data, ...res.data.data[idx] });
            });
            setCategoryList(category);
            setSelected(category[0]);
            setAdvertiserList(datas);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, []);

  const handleCreateAdvertisers = (e) => {
    e.preventDefault();

    let hasErrors = false;
    if (isEmpty(advertiserFormValues.name)) {
      hasErrors = true;
    }
    if (isEmpty(advertiserFormValues.adomain)) {
      hasErrors = true;
    }
    if (isEmpty(advertiserFormValues.marketing_name)) {
      hasErrors = true;
    }
    if (hasErrors) {
      toast.error("All fields are required");
      return;
    }
    setIsCreateAdvertiserLoading(true);

    axios
      .post(
        `https://ribeye-one.vercel.app/api/v1/advertisers/create`,
        advertiserFormValues,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        advertiserFormValues.name = "";
        advertiserFormValues.adomain = "";
        advertiserFormValues.marketing_name = "";
        setShowCreateAdv(false);
        setIsCreateAdvertiserLoading(false);
      })
      .catch((error) => {
        toast.error("error");
        setIsCreateAdvertiserLoading(false);
      });
  };

  useEffect(() => {
    if (advertiserList.length > 0 && editForm) {
      const foundAdvertiser = advertiserList.find((el) => {
        return el.public_identifier === singleAdvertiser;
      });

      setSelectAdvertiser(foundAdvertiser.name);
    }
  }, [advertiserList, editForm]);

  return (
    <>
      <div className="mb-5 bg-[#F7F9FB] w-full p-5 pb-10 rounded-lg">
        <div className="flex items-center">
          <CampaignOutlinedIcon style={{ color: "#1C1C1C" }} />
          <h2 className="mx-2 text-[#1C1C1C] font-semibold">Advertiser</h2>
        </div>
        {editForm ? (
          <h2 className="my-2 ml-8 text-base">
            {isLoading ? (
              <div className="w-full">
                <Loader color={"#000"} />
              </div>
            ) : selectAdvertiser ? (
              selectAdvertiser
            ) : (
              ""
            )}
          </h2>
        ) : (
          <Menu
            as="div"
            className={`${
              editForm ? "pointer-events-none" : ""
            } relative w-full inline-block text-left mt-6`}
          >
            {({ close }) => (
              <>
                {!showCreateAdv ? (
                  <>
                    <div className="w-full flex items-center">
                      <Menu.Button className="flex justify-between items-center w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <div className="flex items-center ">
                          <p className="text-gray-900 leading-6 font-normal">
                            {selectAdvertiser ? selectAdvertiser : "Select..."}
                          </p>
                        </div>
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute w-full left-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <div className="w-full overflow-auto max-h-[300px]">
                            {isLoading ? (
                              <div className="w-full flex justify-center p-5">
                                <Loader />
                              </div>
                            ) : (
                              advertiserList.map((d, i) => {
                                return (
                                  <div
                                    key={"advertiser-" + i}
                                    onClick={() => {
                                      setSelectAdvertiser(d.name);
                                      setCampaignFormValues((prevState) => ({
                                        ...prevState,
                                        advertiser_public_identifier:
                                          d.public_identifier,
                                      }));
                                      close();
                                    }}
                                    className="flex hover:bg-gray-200 items-center justify-between p-3 mx-3 rounded-sm"
                                  >
                                    <div className="flex items-center">
                                      <div className="h-9 w-9 border border-gray-300 rounded mr-4 p-1">
                                        <img
                                          className="w-full"
                                          src="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://www.ribeye.media&size=64"
                                          alt=""
                                        />
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-700">
                                          {d.name}
                                        </span>
                                        <span className="text-xs font-normal text-gray-500 flex items-center">
                                          <span>
                                            <span>Business</span> •{" "}
                                            <span>www.web.com</span>
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                    <button className="rounded-lg transition-shadow duration-300 hover:shadow-none w-10 h-10 hover:bg-gray-200 hover:cursor-pointer border shadow-sm bg-white">
                                      <div className="h-full inline-flex items-center w-full justify-center hover:text-gray-600 hover:fill-gray-600 text-gray-400 fill-gray-400">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        >
                                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41z"></path>
                                        </svg>
                                      </div>
                                    </button>
                                  </div>
                                );
                              })
                            )}
                          </div>

                          <div className="p-3" role="none">
                            <button
                              onClick={() => setShowCreateAdv(true)}
                              type="button"
                              className="base-button hover-primary flex justify-center text-center font-semibold rounded-[10px] enabled:bg-primary text-white [&>svg]:enabled:fill-white disabled:cursor-default disabled:bg-gray-300 [&>svg]:disabled:fill-white py-3 px-5 text-sm [&>svg]:-ml-1 [&>svg]:mr-3 w-full"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                aria-hidden="true"
                                role="none"
                              >
                                <path
                                  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                                  role="none"
                                ></path>
                              </svg>{" "}
                              Create advertiser
                            </button>
                          </div>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                ) : (
                  <>
                    <form>
                      <div className="flex flex-wrap items-center justify-between">
                        <div className="mb-5 w-full sm:w-[48.5%]">
                          <label
                            htmlFor
                            className="block text-sm text-gray-500 font-normal mb-1"
                          >
                            Name
                          </label>
                          <div className="w-full">
                            <input
                              className="
                border-gray-200 focus:border-[#708090] bg-white hover:border-gray-300 kx-input border flex w-full text-sm text-gray-900 rounded-lg px-3 py-2
                 outline-0 placeholder-gray-200 p-0 bg-transparent "
                              type="text"
                              name="name"
                              value={advertiserFormValues.name}
                              onChange={inputChangeHandler}
                              placeholder
                              autoComplete="off"
                            />
                          </div>
                        </div>

                        <div
                          className="relative mb-5 z-10 w-full sm:w-[48.5%]"
                          onClick={() => setSelectCateg(!selectCateg)}
                        >
                          <span>
                            <label>Category</label>
                          </span>
                          <Listbox
                            value={selected}
                            onChange={(obj) => {
                              setSelected(obj);
                              setAdvertiserFormValues((prevState) => {
                                return {
                                  ...prevState,
                                  category_ids: [obj.key],
                                };
                              });
                            }}
                          >
                            <div className="mt-1">
                              <Listbox.Button className="w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-[#708090] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm border border-gray-200">
                                <span className="block truncate">
                                  {selected.name}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 top-8 flex items-center pr-2">
                                  <KeyboardArrowDownIcon
                                    className={`h-5 w-5 text-gray-400 ${
                                      !selectCateg
                                        ? "rotate-[0]"
                                        : "rotate-[180deg]"
                                    }`}
                                  />
                                </span>
                              </Listbox.Button>
                              <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute advert_list mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {categoryList.map((person, personIdx) => (
                                    <Listbox.Option
                                      key={personIdx}
                                      className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                          active
                                            ? "bg-blue-100 text-gray-700"
                                            : "text-gray-900"
                                        }`
                                      }
                                      value={person}
                                    >
                                      {({ selected }) => (
                                        <>
                                          <span
                                            className={`block truncate ${
                                              selected
                                                ? "font-medium"
                                                : "font-normal"
                                            }`}
                                          >
                                            {person.name}
                                          </span>
                                          {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>

                        <div className="mb-5 w-full sm:w-[48%]">
                          <label
                            htmlFor
                            className="block text-sm text-gray-500 font-normal mb-1"
                          >
                            Website
                          </label>
                          <div className="w-full">
                            <input
                              className="
                border-gray-200 focus:border-[#708090] bg-white hover:border-gray-300 kx-input border flex w-full text-sm text-gray-900 rounded-lg px-3 py-2
                 outline-0 placeholder-gray-400 p-0 bg-transparent "
                              type="text"
                              name="adomain"
                              value={advertiserFormValues.adomain}
                              onChange={inputChangeHandler}
                              placeholder="www.yourbrand.com"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center justify-between w-full">
                        <div className="flex gap-2">
                          <button
                            onClick={handleCreateAdvertisers}
                            type="submit"
                            className="base-button min-w-[100px] justify-center rounded-lg hover-primary flex enabled:bg-primary text-white [&>svg]:enabled:fill-white disabled:cursor-default disabled:bg-gray-300 [&>svg]:disabled:fill-white py-2 px-5 text-sm [&>svg]:-ml-1 [&>svg]:mr-3"
                          >
                            {isCreateAdvertiserLoading ? (
                              <Loader color={"#fff"} />
                            ) : (
                              <>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                >
                                  <path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z" />
                                </svg>
                                <span>Create advertiser</span>
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowCreateAdv(false)}
                            className="base-button rounded-lg items-center flex hover-secondary enabled:bg-primary/[.05] enabled:hover:bg-primary/[.10] text-primary [&>svg]:enabled:fill-primary disabled:cursor-default disabled:bg-gray-50 disabled:text-gray-300 [&>svg]:disabled:fill-gray-300 py-2 px-5 text-sm [&>svg]:-ml-1 [&>svg]:mr-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              className="h-5 w-5"
                              aria-hidden="true"
                            >
                              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                            </svg>{" "}
                            Cancel{" "}
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </>
            )}
          </Menu>
        )}
      </div>
    </>
  );
};

export default Advertiser;
