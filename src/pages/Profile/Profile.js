import React from "react";
import edit from "../../assets/images/edit.png";
import profile from "../../assets/images/profile.svg";
import usflag from "../../assets/images/usa.svg";
import Header from "../../components/shared/Header";

const Profile = () => {
  return (
    <div className="pt-12 lg:pt-0 relative overflow-hidden container  mx-auto">
      <Header name={`My Profile`} />
      <section className="bg-white rounded-lg p-8  w-full lg:w-[1140px]">
        <div className="flex gap-8 items-center">
          <label htmlFor="image_upload" className="cursor-pointer relative w-[100px] h-[100px] rounded-full ">
            <img src={profile} alt="profile_image" />
            <div className="absolute -right-1 bottom-0 w-8  h-8 flex  justify-center items-center bg-white rounded-full p-[3px]">
              <input className="hidden" type="file" name="image_upload" id="image_upload" />
              <img className="w-full" src={edit} alt="edit" />
            </div>
          </label>
          <div>
            <p className="font-semibold text-2xl">John Parker</p>
            <p className="">Employee</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-wrap  justify-between mt-12 gap-y-10">
          <div className="w-full lg:w-1/2 px-2">
            <p className="mb-2 font-semibold text-sm">First Name</p>
            <input
              placeholder="First Name"
              type="text"
              className="bg-[#F8F8F8] border rounded-lg py-3 px-3 w-full"
              name="first_name"
            />
          </div>
          <div className="w-full lg:w-1/2 px-2">
            <p className="mb-2 font-semibold text-sm">Last Name</p>
            <input
              placeholder="Last Name"
              type="text"
              className="bg-[#F8F8F8] border rounded-lg py-3 px-3 w-full"
              name="last_name"
            />
          </div>
          <div className="w-full lg:w-1/2 px-2">
            <p className="mb-2 font-semibold text-sm">Email</p>
            <input
              placeholder="Email"
              type="text"
              className="bg-[#F8F8F8] border rounded-lg py-3 px-3 w-full"
              name="email"
            />
          </div>
          <div className="w-full lg:w-1/2 px-2">
            <p className="mb-2 font-semibold text-sm">Phone Number</p>
            <div className="bg-[#F8F8F8] border rounded-lg w-full flex items-center px-3">
              <img src={usflag} alt="usflag" />
              <input
                value="+ 1 24863 45862"
                placeholder="Phone Number"
                type="text"
                className="bg-[#F8F8F8] w-full  py-3 px-3 outline-none"
                name="phone_number"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-2">
            <p className="mb-2 font-semibold text-sm">Date of birth</p>
            <div className="flex gap-4 justify-between">
              <select
                className="border rounded-lg py-3 px-3 w-1/3"
                name="date"
                id=""
              >
                <option selected value="01">
                  01
                </option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>
              <select
                className="border rounded-lg py-3 px-3 w-1/3"
                name="month"
                id=""
              >
                <option selected value="Decembar">
                  Decembar
                </option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="Septembar">Septembar</option>
                <option value="Octobar">Octobar</option>
                <option value="Novembar">Novembar</option>
              </select>
              <select
                className="border rounded-lg py-3 px-3 w-1/3"
                name="year"
                id=""
              >
                <option selected value="2001">
                  2001
                </option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
                <option value="2010">2010</option>
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option selected value="2022">
                  2022
                </option>
              </select>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-2">
            <p className="mb-2 font-semibold text-sm">Ages</p>
            <input
              placeholder="Ages"
              type="text"
              className="bg-[#F8F8F8] border rounded-lg py-3 px-3 w-full"
              name="age"
            />
          </div>
          <div className="w-full lg:w-1/2 px-2">
            <p className="mb-2 font-semibold text-sm">Titles</p>
            <input
              placeholder="Titles"
              type="text"
              className="bg-[#F8F8F8] border rounded-lg py-3 px-3 w-full"
              name="title"
            />
          </div>
          <div className="w-full lg:w-1/2 px-2">
            <p className="mb-2 font-semibold text-sm">Manager</p>
            <input
              placeholder="Manager"
              type="text"
              className="bg-[#F8F8F8] border rounded-lg py-3 px-3 w-full"
              name="Manager"
            />
          </div>{" "}
          <div className="w-full lg:w-1/2 px-2">
            <p className="mb-2 font-semibold text-sm">Location</p>
            <select
              className="border rounded-lg py-3 px-3 w-full"
              name="location"
              id="location"
            >
              <option selected value="New  york">
                New york
              </option>
              <option value="Califonia">Califonia</option>
              <option value="Texas">Texas</option>
              <option value="Florida">Florida</option>
              <option value="Virginia">Virginia</option>
              <option value="hawaii">hawaii</option>
              <option value="Alaska">Alaska</option>
              <option value="Georgia">Georgia</option>
              <option value="Washinton">Washinton</option>
              <option value="Ohio">Ohio</option>
              <option value="Colorado">Colorado</option>
              <option value="Oregon">Oregon</option>
              <option value="New Jersey">New Jersey</option>
              <option value="Michigan">Michigan</option>
              <option value="North  Carolina">North Carolina</option>
              <option value="Arizona">Arizona</option>
              <option value="Califonia">Califonia</option>
              <option value="Texas">Texas</option>
              <option value="Florida">Florida</option>
              <option value="Virginia">Virginia</option>
              <option value="hawaii">hawaii</option>
              <option value="Alaska">Alaska</option>
              <option value="Georgia">Georgia</option>
              <option value="Washinton">Washinton</option>
              <option value="Ohio">Ohio</option>
              <option value="Colorado">Colorado</option>
              <option value="Oregon">Oregon</option>
              <option value="New Jersey">New Jersey</option>
              <option value="Michigan">Michigan</option>
              <option value="North  Carolina">North Carolina</option>
              <option value="Arizona">Arizona</option>
            </select>
          </div>
        </div>
      </section >
    </div >
  );
};

export default Profile;
