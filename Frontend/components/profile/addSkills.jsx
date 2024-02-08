"use client";

import { useEffect, useState } from "react";
import Modal from "../myUI/modal";
import { Input } from "../ui/input";
import _ from "lodash";
import { MdClose } from "react-icons/md";
import { addSkill, getAllSkills } from "@/lib/actions/skills.actions";
import { updateMyProfile } from "@/lib/actions/profile.actions";
import { useUser } from "@clerk/nextjs";

const AddSkills = () => {
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [mySkills, setMySkills] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    const debouncedFetchSkills = _.debounce(async () => {
      if (!skill) {
        setSkills([]);
        return;
      }
      const skills = await getAllSkills(skill);
      setSkills(skills);
    }, 500);
    debouncedFetchSkills();
  }, [skill]);

  const handleAddSkill = async (selected) => {
    let newSkill;
    setSelectedSkill(selected);
    const skillExists = skills.find((sk) => sk._id === selectedSkill._id);
    if (!skillExists) {
      newSkill = await addSkill(skill);
    } else {
      newSkill = selectedSkill;
    }
    if (newSkill) {
      setMySkills((prev) => [...prev, newSkill]);
      setSkill("");
      setSelectedSkill(null);
      setSkills([]);
    }
  };

  const handleSaveSkills = async () => {
    if (mySkills.length > 0) {
      await updateMyProfile(user?.publicMetadata?.userId, {
        skills: mySkills,
      });
    }
  };

  return (
    <Modal
      trigerText="Add More Skills"
      title="Add Skills"
      description="Type your skill name and press enter to add it. You can add multiple skills at once."
      actionButtonText="Save Skills"
      onAction={handleSaveSkills}
      size={"3xl"}
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <label htmlFor="skills" className="sr-only">
            My Skills
          </label>
          <div id="skills" className="flex flex-wrap gap-2 w-full mb-1">
            {mySkills.map((sk) => (
              <div
                key={sk._id || sk}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20"
              >
                <p className="text-primary font-semibold">{sk.name}</p>
                <button
                  className="text-primary/60"
                  onClick={() => {
                    setMySkills(mySkills.filter((s) => s._id !== sk._id));
                  }}
                >
                  <MdClose />
                </button>
              </div>
            ))}
          </div>
          <label htmlFor="skill" className="sr-only">
            Skill Name
          </label>
          <Input
            id="skill"
            placeholder="Start typing..."
            value={skill}
            onChange={(e) => {
              setSkill(e.target.value);
            }}
            className="w-full bg-primary/10 focus:outline-0 focus:ring-0 focus:ring-transparent text-primary font-semibold"
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleAddSkill}
            className="w-max rounded block text-start px-4 py-2 focus:outline-0 focus:ring-0 focus:ring-transparent hover:bg-primary/20 transition-all"
          >
            {skill}
          </button>
          {skills.length > 0 &&
            skills.map((s, index) => (
              <button
                key={s._id}
                onClick={async () => await handleAddSkill(skills[index])}
                className="w-max rounded block text-start px-4 py-2 focus:outline-0 focus:ring-0 focus:ring-transparent hover:bg-primary/20 transition-all"
              >
                {s.name}
              </button>
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default AddSkills;