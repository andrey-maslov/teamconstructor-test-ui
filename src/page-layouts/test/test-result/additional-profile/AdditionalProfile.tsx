import Table from "../../../../components/common/tables/table/Table"
import Box from "../../../../components/common/box/Box"

interface AdditionalProfileProps {
    values: Array<number>
    titles: Array<string>[]
}

const AdditionalProfile = ({values, titles}: AdditionalProfileProps) => {

    const tableHeader = titles.map(item => (`${item[0]}-${item[1]}`))

    return (
        <Box>
            <Table
                tableHeader={tableHeader}
                tableData={[values]}
            />
        </Box>
    )
}

export default AdditionalProfile