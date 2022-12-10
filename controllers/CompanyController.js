const Company = require('../models/company')

exports.index = async (req, res) => {
  const companys = await Company.findOne()
  res.send(company)
  const company = await Company.find().sort({ _id: '1' })
  res.send({ data: company })
}

exports.show = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
    if (!company) throw new Error('ไม่พบข้อมูล')
    res.send({ data: company })
  } catch (err) {
    res.status(404).json({ message: 'error : ' + err.message })
  }
}

exports.insert = async (req, res) => {
  try {
    const { name, address } = req.body
    const company = new Company({ name, address })
    await company.save()
    res.status(201).json({ message: 'เพิ่มข้อมูลสำเร็จ' })
  } catch (err) {
    res.status(404).json({ message: 'error : ' + err.message })
  }
}

exports.update = async (req, res) => {
  try {
    const { id } = req.params
    const { name, address } = req.body
    const company = await Company.updateOne({ _id: id }, { name, address })
    if (company.matchedCount === 0) throw new Error('ไม่พบข้อมูลบริษัท')
    res.status(200).json({ message: 'อัพเดทข้อมูลบริษัทสำเร็จ' })
  } catch (err) {
    res.status(404).json({ message: 'error : ' + err.message })
  }
}

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params
    const company = await Company.deleteOne({ _id: id })
    if (company.deletedCount === 0) throw new Error('ไม่พบข้อมูลบริษัท')
    res.status(200).json({ message: 'ลบข้อมูลบริษัทสำเร็จ' })
  } catch (err) {
    res.status(404).json({ message: 'error : ' + err.message })
  }
}