'use client'
import Select, { StylesConfig } from 'react-select'
import makeAnimated from 'react-select/animated'
import React, { useState } from 'react'

export default function ContactPage() {
  const [selectedOption, setSelectedOption] = useState<any>(null)

  const options = [
    {
      value: 1,
      label: 'javascript',
    },
    {
      value: 2,
      label: 'typescript',
    },
    {
      value: 3,
      label: 'react',
    },
    {
      value: 4,
      label: 'next',
    },
    {
      value: 5,
      label: 'firebase',
    },
    {
      value: 6,
      label: 'node',
    },
    {
      value: 7,
      label: 'express',
    },
    {
      value: 8,
      label: 'graphql',
    },
    {
      value: 9,
      label: 'apollo',
    },
    {
      value: 10,
      label: 'prisma',
    },
    {
      value: 11,
      label: 'mysql',
    },
    {
      value: 12,
      label: 'mongodb',
    },
    {
      value: 13,
      label: 'docker',
    },
    {
      value: 14,
      label: 'kubernetes',
    },
    {
      value: 15,
      label: 'aws',
    },
    {
      value: 16,

      label: 'gcp',
    },
    {
      value: 17,
      label: 'azure',
    },
    {
      value: 18,
      label: 'linux',
    },
    {
      value: 19,
      label: 'nginx',
    },
    {
      value: 20,
      label: 'apache',
    },
    {
      value: 21,

      label: 'git',
    },
    {
      value: 22,
      label: 'github',
    },
    {
      value: 23,
      label: 'gitlab',
    },
    {
      value: 24,
      label: 'bitbucket',
    },
    {
      value: 25,
      label: 'jira',
    },
    {
      value: 26,
      label: 'confluence',
    },
    {
      value: 27,
      label: 'notion',
    },
    {
      value: 28,
      label: 'slack',
    },
    {
      value: 29,
      label: 'trello',
    },
    {
      value: 30,
      label: 'figma',
    },
    {
      value: 31,
      label: 'adobe xd',
    },
    {
      value: 32,
      label: 'adobe photoshop',
    },
    {
      value: 33,
      label: 'adobe illustrator',
    },
    {
      value: 34,
      label: 'adobe after effect',
    },
    {
      value: 35,
      label: 'adobe premiere',
    },
    {
      value: 36,
      label: 'adobe lightroom',
    },
    {
      value: 37,
      label: 'adobe audition',
    },
  ]

  const animatedComponents = makeAnimated()
  return (
    <div>
      <h1>Contact me</h1>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        components={animatedComponents}
        options={options}
        isMulti
      />
    </div>
  )
}
