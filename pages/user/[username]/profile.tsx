import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { signOut } from 'next-auth/react';
import prisma from '../../../adapters/prisma';
import Name from '../../../components/elements/account-name';
import Button from '../../../components/elements/button';
import Logo from '../../../components/elements/logo';
import Layout from '../../../components/layout';
import Header from '../../../components/layout/header';
import Main from '../../../components/layout/main';
import Fields from '../../../components/section/input-fields';
import NavigationBar from '../../../components/section/navbar';
import NavLinks from '../../../components/section/navbar/nav-links';
import SidePanel from '../../../components/section/side-panel';
import SideBar from '../../../components/styled/sidebar';
import type { Profile, User } from '../../../prisma/definition';
import serializeData from '../../../utilities/serialize-data';
import { UserIcon, CheckIcon, PencilAltIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { Gender } from '@prisma/client';
import useUserStore from '../../../stores/use-user-store';
import Dropdown from '../../../components/styled/dropdown';
import { Listbox } from '@headlessui/react';
import ProfileField from '../../../components/section/input-fields/profileField';
import moment from 'moment';

interface Props {
  user: User;
}

const Profile: NextPage<Props> = ({ user }) => {
  // console.log(user);
  const createProfile = useUserStore((state) => state.create.profile);
  const updateProfile = useUserStore((state) => state.update.profile);
  const [inputField, setInputField] = useState<Profile>({
    id: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: Gender.FEMALE,
    birthdate: '',
    contact: '',
    updatedAt: '',
    userId: user.id,
  });
  const [selectedGender, setSelectedGender] = useState(
    user.profile?.gender ? user.profile?.gender : Gender.OTHERS
  );
  const [genders] = useState(['MALE', 'FEMALE', 'OTHERS']);
  const [edit, setEdit] = useState(false);
  const [showCreateProfile, setShowCreateProfile] = useState(!user.profile);

  console.log(showCreateProfile);

  useEffect(() => {
    if (user.profile) {
      console.log('hello');
      setInputField({
        ...inputField,
        firstName: user.profile.firstName,
        middleName: user.profile.middleName,
        lastName: user.profile.lastName,
        gender: user.profile.gender,
        birthdate: user.profile.birthdate,
        contact: user.profile.contact,
      });
    }
  }, []);

  return (
    <Layout store={{ user }}>
      <Header>
        {/* mobile navbar */}
        <div className="lg:hidden">
          <NavigationBar fixed={false}>
            <Logo place="justify-start" />
            <SideBar
              logout={true}
              items={[
                { name: 'Request', link: `/user/${user.email.split('@')[0]}` },
                {
                  name: 'Notifications',
                  link: `/user/${user.email.split('@')[0]}/notifications`,
                },
                {
                  name: 'Profile',
                  link: `/user/${user.email.split('@')[0]}/profile`,
                },
                {
                  name: 'Payment',
                  link: `/user/${user.email.split('@')[0]}/payment`,
                },
              ]}
            />
          </NavigationBar>
        </div>

        {/* laptop navbar */}
        <div className="hidden lg:block">
          <NavigationBar fixed={false}>
            <Logo place="justify-start" />
            <NavLinks>
              <Name name={user.name} />
              <Button label="Log Out" color={true} handler={() => signOut()} />
            </NavLinks>
          </NavigationBar>
        </div>
      </Header>

      <Main>
        <section className="h-full grid lg:grid-cols-[auto,1fr]">
          <SidePanel
            image={user.image}
            name={user.email.split('@')[0]}
            admin={false}
          />
          <section className="flex flex-col gap-3 px-10 py-7">
            <div className="flex gap-3 items-clientSecret ">
              <h1 className="font-semibold tracking-wide">Profile Account</h1>
              <button onClick={() => setEdit(!edit)}>
                <PencilAltIcon className="w-5 h-5 hover:-translate-y-1 hover:text-primary cursor-pointer transition-all duration-300" />
              </button>
            </div>
            <Fields>
              <div className="flex flex-col gap-6 relative">
                {!edit && <div className="absolute inset-0 z-10"></div>}
                <ProfileField
                  icon={UserIcon}
                  inputField={inputField}
                  setInputField={setInputField}
                  user={user}
                  value={inputField.firstName}
                  defaultValue={inputField.firstName}
                  field="firstName"
                  edit={edit}
                />

                <ProfileField
                  icon={UserIcon}
                  inputField={inputField}
                  setInputField={setInputField}
                  user={user}
                  value={inputField.middleName}
                  defaultValue={user.profile ? user.profile.middleName : ''}
                  field="middleName"
                  edit={edit}
                />
                <ProfileField
                  icon={UserIcon}
                  inputField={inputField}
                  setInputField={setInputField}
                  user={user}
                  value={inputField.lastName}
                  defaultValue={
                    user.profile
                      ? user.profile.lastName
                      : user.name.split(' ').slice(-1).join(' ')
                  }
                  field="lastName"
                  edit={edit}
                />

                <ProfileField
                  icon={UserIcon}
                  inputField={inputField}
                  setInputField={setInputField}
                  user={user}
                  value={inputField.contact}
                  defaultValue={user.profile ? user.profile.contact : ''}
                  field="contact"
                  edit={edit}
                />

                {/* birthday */}
                <div className="flex flex-col gap-3">
                  <h2 className="text-sm font-medium tracking-wide">
                    Birthday
                  </h2>

                  {user.profile && !edit && (
                    <input
                      type="text"
                      value={moment(user.profile?.birthdate).format('LL')}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          birthdate: e.target.value,
                        })
                      }
                      className="w-72 lg:w-96 py-3 pl-4 "
                    />
                  )}

                  {user.profile && edit && (
                    <input
                      type="date"
                      value={moment(user.profile?.birthdate)
                        .format()
                        .slice(0, 10)}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          birthdate: e.target.value,
                        })
                      }
                      className="w-72 lg:w-96 py-3 pl-4 "
                    />
                  )}

                  {!user?.profile && (
                    <input
                      type="date"
                      defaultValue={user.profile ? user.profile.birthdate : ''}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          birthdate: e.target.value,
                        })
                      }
                      className="w-72 lg:w-96 py-3 pl-4 "
                    />
                  )}
                </div>

                {/* gender */}
                <div className="grid gap-2">
                  <h2 className="text-xs lg:text-sm font-medium tracking-wide">
                    Gender
                  </h2>

                  <Dropdown
                    value={selectedGender}
                    onChange={setSelectedGender}
                    buttonName={selectedGender}>
                    {genders.map((gender, index) => (
                      <Listbox.Option
                        key={index}
                        className="hover:bg-primary/40 hover:text-primary text-sm cursor-pointer"
                        value={gender}>
                        {({ active, selected }) => (
                          <h3
                            onClick={() =>
                              setInputField({
                                ...inputField,
                                gender: gender as Gender,
                              })
                            }
                            className={`${
                              active
                                ? 'bg-primary/40 text-primary'
                                : 'text-black'
                            } flex items-center gap-3 p-3`}>
                            {selected && (
                              <CheckIcon className="bg-primary/30 rounded-full p-1 text-primary w-5 h-5" />
                            )}
                            {gender}
                          </h3>
                        )}
                      </Listbox.Option>
                    ))}
                  </Dropdown>
                </div>
              </div>
            </Fields>

            <div className="mt-16">
              {user.profile && edit && (
                <Button
                  label="Save Changes"
                  color={true}
                  handler={() => {
                    updateProfile({ profile: inputField });
                    setEdit(false);
                    console.log('edited', inputField);
                  }}
                />
              )}

              {!user.profile && showCreateProfile && (
                <Button
                  label="Create Profile Account"
                  color={true}
                  handler={() => {
                    createProfile({ profile: inputField });
                    setShowCreateProfile(false);
                    console.log(inputField);
                  }}
                />
              )}
            </div>
          </section>
        </section>
      </Main>
    </Layout>
  );
};

export default Profile;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: { email: `${String(params!.username)}@gmail.com` },
    include: {
      profile: true,
      records: {
        where: { withId: null },
        include: { members: true },
      },
    },
  });
  return {
    props: {
      user: serializeData(user),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
      records: {
        where: { withId: null },
        include: { members: true },
      },
    },
  });

  const paths = users.map((user) => {
    return {
      params: { username: String(user.email!.split('@')[0]) },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};
